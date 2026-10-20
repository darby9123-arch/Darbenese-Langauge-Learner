"use strict";

// Optional game layer. Shares the same local progress as the language course.
const QUESTS=[
  {id:"xp",title:"Earn 50 XP",goal:50,reward:15},
  {id:"answers",title:"Get 5 correct answers",goal:5,reward:15},
  {id:"sessions",title:"Finish a lesson or review",goal:1,reward:20}
];
const BADGES=[
  {id:"first",title:"First Steps",desc:"Finish your first lesson",reward:25,mark:"1"},
  {id:"vocab",title:"Word Explorer",desc:"Discover 12 words",reward:30,mark:"W"},
  {id:"all",title:"Word Collector",desc:"Discover all 25 words",reward:60,mark:"24"},
  {id:"reviews",title:"Practice Champion",desc:"Finish 3 reviews",reward:35,mark:"R"},
  {id:"accuracy",title:"Hard Worker",desc:"Get 50 answers right",reward:50,mark:"50"},
  {id:"streak",title:"Steady Learner",desc:"Practice on 3 consecutive days",reward:40,mark:"3"}
];
const AVATARS=["D","★","✦","☀","◆","▲"];
const HEART_CAP=5,HEART_MS=20*60000;
function newQuests(){return{day:today(),xp:0,answers:0,sessions:0,claimed:[]};}
function initialiseExtras(){
  state.goal=[20,50,100].includes(Number(state.goal))?Number(state.goal):50;
  state.gems=cleanNum(state.gems);
  state.hearts=Number.isFinite(Number(state.hearts))?Math.max(0,Math.min(HEART_CAP,Math.floor(Number(state.hearts)))):HEART_CAP;
  state.heartAt=Number.isFinite(Number(state.heartAt))?Math.max(0,Math.min(Date.now(),Number(state.heartAt))):Date.now();
  state.hints=cleanNum(state.hints,10000);
  state.avatar=AVATARS.includes(state.avatar)?state.avatar:"D";
  state.claimedBadges=Array.isArray(state.claimedBadges)?state.claimedBadges.filter(id=>BADGES.some(b=>b.id===id)):[];
  state.history=Array.isArray(state.history)?[...new Set(state.history.filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d)))].slice(-120):[];
  if(state.lastDay&&!state.history.includes(state.lastDay))state.history.push(state.lastDay);
  if(!state.quests||typeof state.quests!=="object"||state.quests.day!==today())state.quests=newQuests();
  state.quests.claimed=Array.isArray(state.quests.claimed)?state.quests.claimed.filter(id=>QUESTS.some(q=>q.id===id)):[];
  for(const id of ["xp","answers","sessions"])state.quests[id]=cleanNum(state.quests[id]);
  save();
}
initialiseExtras();

function refreshExtrasDay(){
  if(state.quests.day!==today()){state.quests=newQuests();save();}
}
function regenerateHearts(){
  if(state.hearts>=HEART_CAP){state.hearts=HEART_CAP;state.heartAt=Date.now();return;}
  const recovered=Math.floor(Math.max(0,Date.now()-state.heartAt)/HEART_MS);
  if(recovered>0){
    state.hearts=Math.min(HEART_CAP,state.hearts+recovered);
    state.heartAt=state.hearts===HEART_CAP?Date.now():state.heartAt+recovered*HEART_MS;
    save();
  }
}
function losePersistentHeart(){
  regenerateHearts();
  if(state.hearts>0){if(state.hearts===HEART_CAP)state.heartAt=Date.now();state.hearts--;}
  if(session)session.hearts=state.hearts;
  save();updateHeader();
}
function gainPersistentHearts(count){
  regenerateHearts();
  state.hearts=Math.min(HEART_CAP,state.hearts+count);
  if(state.hearts===HEART_CAP)state.heartAt=Date.now();
  if(session)session.hearts=state.hearts;
  save();updateHeader();
}
function trackQuest(id,amount=1){
  refreshExtrasDay();
  if(!QUESTS.some(q=>q.id===id))return;
  state.quests[id]=cleanNum(state.quests[id])+amount;
  save();
}
function questProgress(q){refreshExtrasDay();return Math.min(q.goal,state.quests[q.id]);}
function claimQuest(id){
  refreshExtrasDay();
  const q=QUESTS.find(x=>x.id===id);
  if(!q||state.quests.claimed.includes(id)||questProgress(q)<q.goal)return;
  state.quests.claimed.push(id);
  state.gems+=q.reward;save();updateHeader();renderRewards();
}
function badgeEarned(id){
  if(id==="first")return state.lessons>=1;
  if(id==="vocab")return discovered().length>=12;
  if(id==="all")return discovered().length>=WORDS.length;
  if(id==="reviews")return state.reviews>=3;
  if(id==="accuracy")return state.correct>=50;
  if(id==="streak")return shownStreak()>=3;
  return false;
}
function syncAchievements(){
  let awarded=false;
  for(const b of BADGES){
    if(!state.claimedBadges.includes(b.id)&&badgeEarned(b.id)){
      state.claimedBadges.push(b.id);state.gems+=b.reward;awarded=true;
    }
  }
  if(awarded)save();
}
function questCard(q,mini=false){
  const amount=questProgress(q),done=amount>=q.goal,claimed=state.quests.claimed.includes(q.id);
  return '<div class="quest-card '+(mini?"mini":"")+'"><div class="reward-card-title"><strong>'+esc(q.title)+'</strong><span class="gem-text">+'+q.reward+' ◆</span></div><div class="meter"><i style="width:'+Math.min(100,amount/q.goal*100)+'%"></i></div><div class="reward-foot"><span>'+amount+' / '+q.goal+'</span><button class="reward-claim" '+(!done||claimed?'disabled':'onclick="claimQuest(\''+q.id+'\')"')+'>'+(claimed?"Claimed":done?"Claim reward":"In progress")+'</button></div></div>';
}
function renderRewards(){
  refreshExtrasDay();regenerateHearts();syncAchievements();
  $("rewardsSummary").innerHTML='<div class="stat"><span>Gems earned</span><strong>'+state.gems+' ◆</strong><small>Free in-game rewards</small></div><div class="stat"><span>Hearts available</span><strong>'+state.hearts+' / '+HEART_CAP+'</strong><small>'+(state.hearts===HEART_CAP?"Full":state.hearts===0?"Practice to restore one":"One returns every 20 minutes")+'</small></div><div class="stat"><span>Hint tokens</span><strong>'+state.hints+'</strong><small>Optional question help</small></div>';
  $("questList").innerHTML=QUESTS.map(q=>questCard(q)).join("");
  $("badgeList").innerHTML=BADGES.map(b=>{
    const unlocked=state.claimedBadges.includes(b.id);
    return '<div class="reward-item '+(unlocked?"unlocked":"")+'"><span class="badge-symbol">'+esc(b.mark)+'</span><div><strong>'+esc(b.title)+'</strong><p>'+esc(b.desc)+'</p><small>'+(unlocked?"Unlocked · +"+b.reward+" ◆":"Locked · "+b.reward+" ◆ reward")+'</small></div></div>';
  }).join("");
  const offers=[
    {id:"heart",title:"One heart",desc:"Restore one heart",cost:20,mark:"♥"},
    {id:"refill",title:"Refill your hearts",desc:"Return to five hearts",cost:60,mark:"♥♥"},
    {id:"hints",title:"Three hint tokens",desc:"Help on three questions",cost:30,mark:"?"}
  ];
  $("shopList").innerHTML=offers.map(o=>{
    const unavailable=state.gems<o.cost||((o.id==="heart"||o.id==="refill")&&state.hearts===HEART_CAP);
    return '<div class="reward-item"><span class="badge-symbol">'+esc(o.mark)+'</span><div><strong>'+esc(o.title)+'</strong><p>'+esc(o.desc)+'</p><button class="secondary shop-buy" onclick="buyItem(\''+o.id+'\')" '+(unavailable?'disabled':'')+'>Get for '+o.cost+' ◆</button></div></div>';
  }).join("");
  $("avatarPicker").innerHTML=AVATARS.map((symbol,i)=>'<button class="avatar-option '+(state.avatar===symbol?"chosen":"")+'" onclick="setAvatar('+i+')" aria-label="Choose '+esc(symbol)+' profile icon" aria-pressed="'+(state.avatar===symbol)+'">'+esc(symbol)+'</button>').join("");
  updateHeader();
}
function buyItem(id){
  regenerateHearts();
  const prices={heart:20,refill:60,hints:30};
  const price=prices[id];
  if(!price||state.gems<price)return;
  if((id==="heart"||id==="refill")&&state.hearts===HEART_CAP)return;
  state.gems-=price;
  if(id==="heart")gainPersistentHearts(1);
  if(id==="refill")gainPersistentHearts(HEART_CAP);
  if(id==="hints")state.hints+=3;
  save();updateHeader();renderRewards();
}
function setDailyGoal(value){
  const valueNum=Number(value);
  if(![20,50,100].includes(valueNum))return;
  state.goal=valueNum;save();renderHome();
}
function setAvatar(i){
  if(!AVATARS[i])return;
  state.avatar=AVATARS[i];save();updateHeader();renderRewards();
}
function useHint(){
  if(!session||session.locked||session.hintUsed||!state.hints||!session.current)return;
  const q=session.current;
  let hint=q.hint||"Recall the words from the earlier lesson.";
  if(q.category==="match"){
    const id=q.wordIds.find(id=>!session.match.done.has(id));
    if(id)hint=wordById(id).id+" means "+wordById(id).en+".";
  }
  state.hints--;session.hintUsed=true;save();
  $("hintArea").innerHTML='<div class="hint-explanation">Hint: '+esc(hint)+'</div>';
  updateHeader();
}
function startTopicReview(unit){
  if(!Number.isInteger(unit)||unit<0||unit>=UNITS.length)return;
  const known=unitWords(unit).filter(w=>getStat(w.id).seen);
  if(!known.length){window.alert("Learn a few words in this unit first, then you can review this topic.");return;}
  const queue=known.map((w,i)=>makeWordQuestion(w,i%3===0?"typing":"choice",i%2===0,0,unit));
  if(known.length>=3)queue.push(makeMatchQuestion(shuffle(known).slice(0,3)));
  const knownSentences=SENTENCES.filter(s=>s.unit<=unit&&s.parts.every(id=>getStat(id).seen));
  if(knownSentences.length)queue.push(makeSentenceQuestion(shuffle(knownSentences)[0]));
  session={mode:"review",unit,teaching:[],teachIndex:0,queue:shuffle(queue),initialTotal:queue.length,answered:0,rightCount:0,mistakes:0,hearts:state.hearts,gainedXp:0,locked:false,current:null,maxProgress:0,picked:[],match:null};
  setLessonScreen();$("lessonHeartWrap").classList.add("hidden");renderNext();
}

// Keep original lesson logic and progress, extending only the relevant hooks.
const coreRefreshDay=refreshDay;
refreshDay=function(){coreRefreshDay();refreshExtrasDay();};
const coreUpdateHeader=updateHeader;
updateHeader=function(){
  regenerateHearts();coreUpdateHeader();
  $("header-gems").textContent=state.gems;
  $("header-hearts").textContent=state.hearts;
  document.querySelector(".brand-mark").textContent=state.avatar;
};
const coreAwardXp=awardXp;
awardXp=function(amount){coreAwardXp(amount);trackQuest("xp",amount);};
const coreRecordWord=recordWord;
recordWord=function(id,correct){
  coreRecordWord(id,correct);
  if(correct)trackQuest("answers");
};
const coreRecordSentence=recordSentence;
recordSentence=function(correct){
  coreRecordSentence(correct);
  if(correct)trackQuest("answers");
};
const coreRenderHome=renderHome;
renderHome=function(){
  coreRenderHome();syncAchievements();updateHeader();
  $("homeQuests").innerHTML=QUESTS.map(q=>questCard(q,true)).join("");
  $("dailyGoalSelect").value=String(state.goal);
  $("goalXP").textContent=state.goal;
  $("dailyBar").style.width=Math.min(100,state.dailyXp/state.goal*100)+"%";
  $("resumeText").textContent=state.dailyXp>=state.goal?"Daily goal reached. Keep it up!":"Next up: "+UNITS[state.unlocked].name;
};
const coreRenderDictionary=renderDictionary;
renderDictionary=function(){
  coreRenderDictionary();
  const term=norm($("dictionarySearch").value);
  if(!term)return;
  const filtered=discovered().filter(w=>norm(w.id).includes(term)||norm(w.en).includes(term));
  $("dictionary").innerHTML=filtered.length?filtered.map(w=>'<div class="dictionary-entry"><strong>'+esc(w.id)+'</strong><span class="english">'+esc(w.en)+'</span><div class="entry-meta"><span class="pill">'+esc(UNITS[w.unit].label)+'</span><span>Mastery level '+cleanNum(getStat(w.id).level,6)+'/6</span></div></div>').join(""):'<div class="empty-state"><strong>No matching words</strong><p>Try another search.</p></div>';
};
const coreRenderProgress=renderProgressDetails;
renderProgressDetails=function(){
  coreRenderProgress();
  const days=Array.from({length:7},(_,i)=>{
    const d=new Date();d.setDate(d.getDate()-(6-i));
    const key=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
    return {label:d.toLocaleDateString(undefined,{weekday:"short"}),done:state.history.includes(key)};
  });
  $("progressDetails").innerHTML='<div class="panel week-panel"><h3>Last 7 days</h3><p>Days with a completed lesson or review</p><div class="week-days">'+days.map(d=>'<div class="week-day '+(d.done?"active":"")+'"><span>'+esc(d.label)+'</span><b>'+(d.done?"✓":"·")+'</b></div>').join("")+'</div></div>'+$("progressDetails").innerHTML;
};
const coreShowScreen=showScreen;
showScreen=function(name,btn){
  coreShowScreen(name,btn);
  if(name==="rewards")renderRewards();
};
const coreStartLesson=startLesson;
startLesson=function(unit=state.unlocked){
  regenerateHearts();
  if(!state.hearts){showScreen("rewards");return;}
  coreStartLesson(unit);
  if(session?.mode==="course"){session.hearts=state.hearts;progress(session.maxProgress||0);}
};
const coreRenderNext=renderNext;
renderNext=function(){
  if(session?.mode==="course"&&state.hearts<=0&&session.queue.length>0){
    session=null;
    $("quiz").innerHTML='<div class="completion-card"><div class="trophy" aria-hidden="true">♥</div><h2>Time for some practice!</h2><p>You are out of hearts. Your earned XP and word progress are saved. Review your words to earn a heart, or hearts will recover over time.</p><div class="action-row center-actions"><button class="primary" onclick="startReview(\'smart\')">Practise for a heart</button><button class="secondary" onclick="showScreen(\'home\')">Back to course</button></div></div>';
    return;
  }
  coreRenderNext();
  if(session?.current&&state.hints>0){
    session.hintUsed=false;
    $("quiz").insertAdjacentHTML("beforeend",'<div id="hintArea" class="hint-wrap"><button class="text-button hint-button" onclick="useHint()">Use hint ('+state.hints+' available)</button></div>');
  }
};
const coreFinishAnswer=finishAnswer;
finishAnswer=function(correct,alreadyRecorded=false){
  const wasCourse=session?.mode==="course";
  const prevMistakes=session?.mistakes||0;
  coreFinishAnswer(correct,alreadyRecorded);
  if(wasCourse&&session?.mistakes>prevMistakes)losePersistentHeart();
};
const coreSelectMatch=selectMatch;
selectMatch=function(side,id){
  const before=session?.mistakes||0,course=session?.mode==="course";
  coreSelectMatch(side,id);
  if(course&&session?.mistakes>before)losePersistentHeart();
};
const coreFinishSession=finishSession;
finishSession=function(){
  const mode=session?.mode,answered=session?.answered||0;
  coreFinishSession();
  if(!mode)return;
  if(answered){
    if(!state.history.includes(today()))state.history.push(today());
    state.history=state.history.slice(-120);
    trackQuest("sessions");
  }
  if(mode==="review")gainPersistentHearts(1);
  syncAchievements();save();updateHeader();
  if(mode==="review")$("quiz").insertAdjacentHTML("beforeend",'<p class="reward-message">Review complete — you earned 1 heart (up to five). ♥</p>');
};
regenerateHearts();
syncAchievements();
save();
renderHome();
