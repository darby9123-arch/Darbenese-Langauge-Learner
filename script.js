"use strict";

// Darbenese vocabulary is curated here. Do not infer rules or translations beyond this list.
const WORDS = [
  {id:"sava",en:"hello",unit:0,example:"Sava, kelo!",hint:"A greeting you can use when you meet someone."},
  {id:"naro",en:"goodbye",unit:0,example:"Naro, kelo!",hint:"Say this when you're leaving."},
  {id:"kelo",en:"friend",unit:0,example:"Sava, kelo!",hint:"Someone you know and care about."},
  {id:"vexa",en:"game",unit:0,example:"Mi saki vexa.",hint:"Something you play for fun."},
  {id:"zani",en:"food",unit:0,example:"Tu nemi zani.",hint:"Something you eat."},
  {id:"baga",en:"big",unit:0,example:"Baga vexa.",hint:"A description of large size."},
  {id:"mi",en:"I / me",unit:1,example:"Mi saki vexa.",hint:"Use mi when you talk about yourself."},
  {id:"tu",en:"you",unit:1,example:"Tu nemi zani.",hint:"Use tu when speaking to someone."},
  {id:"la",en:"he / she / they",unit:1,example:"La nava vexa.",hint:"Use la when talking about another person."},
  {id:"wi",en:"we / us",unit:1,example:"Wi rava.",hint:"Use wi when including yourself and others."},
  {id:"saki",en:"like",unit:1,example:"Mi saki vexa.",hint:"Saki expresses liking something."},
  {id:"nemi",en:"want",unit:1,example:"Tu nemi zani.",hint:"Nemi expresses wanting something."},
  {id:"dumo",en:"giant",unit:2,example:"Dumo baga.",hint:"Something extremely large."},
  {id:"mira",en:"good",unit:2,example:"Mira!",hint:"A positive description."},
  {id:"luma",en:"happy",unit:2,example:"Luma!",hint:"A cheerful feeling."},
  {id:"sora",en:"sad",unit:2,example:"Sora.",hint:"The opposite feeling of happy."},
  {id:"torga",en:"tall",unit:2,example:"Torga.",hint:"Describes height, not length."},
  {id:"moro",en:"long",unit:2,example:"Moro.",hint:"Describes length."},
  {id:"jarob",en:"fat",unit:2,example:"Jarob.",hint:"An adjective meaning fat. Use descriptions of people respectfully."},
  {id:"liti",en:"small",unit:3,example:"Liti vexa.",hint:"The opposite of big."},
  {id:"nika",en:"short",unit:3,example:"Nika.",hint:"The opposite of long or tall."},
  {id:"vora",en:"have",unit:3,example:"Mi vora zani.",hint:"To possess something."},
  {id:"nava",en:"see",unit:3,example:"La nava vexa.",hint:"What you do with your eyes."},
  {id:"rava",en:"go",unit:3,example:"Wi rava.",hint:"To move or travel."},
  {id:"meka",en:"make / do",unit:3,example:"Mi meka vexa.",hint:"To create or perform something."}
];
const UNITS = [
  {name:"First Words",subtitle:"Greetings and everyday nouns",label:"Basics"},
  {name:"People & Actions",subtitle:"Pronouns, likes and wants",label:"Talk"},
  {name:"Feelings & Size",subtitle:"Describe the world",label:"Describe"},
  {name:"Build Sentences",subtitle:"Useful verbs and short phrases",label:"Create"}
];
const SENTENCES = [
  {unit:1,en:"I like games.",parts:["mi","saki","vexa"],hint:"Darbenese puts the subject first: mi (I), saki (like), vexa (game)."},
  {unit:1,en:"You want food.",parts:["tu","nemi","zani"],hint:"Start with tu (you), then nemi (want), then zani (food)."},
  {unit:3,en:"I have food.",parts:["mi","vora","zani"],hint:"Mi means I, vora means have, and zani means food."},
  {unit:3,en:"They see a game.",parts:["la","nava","vexa"],hint:"La refers to someone else, nava means see, vexa means game."},
  {unit:3,en:"We go.",parts:["wi","rava"],hint:"Wi means we; rava means go."}
];
const STORE_KEY="darbenese_learning_v2",GOAL=50;
const $=id=>document.getElementById(id);
const wordById=id=>WORDS.find(w=>w.id===id);
const unitWords=unit=>WORDS.filter(w=>w.unit===unit);
const norm=x=>String(x||"").toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[.,!?;:]/g,"").replace(/\s+/g," ").trim();
const esc=x=>String(x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const shuffle=list=>{const out=list.slice();for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
const today=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");};
const dayNumber=day=>{const p=day.split("-").map(Number);return Date.UTC(p[0],p[1]-1,p[2])/86400000;};
const cleanNum=(v,max=1000000)=>Math.max(0,Math.min(max,Number(v)||0));
function defaultState(){return{version:2,xp:0,unlocked:0,completed:[],words:{},attempts:0,correct:0,lessons:0,reviews:0,streak:0,lastDay:"",dailyDay:today(),dailyXp:0,skills:{sentenceCorrect:0,sentenceWrong:0}};}
function loadState(){
  let s=defaultState();
  try{
    const raw=localStorage.getItem(STORE_KEY);
    if(raw){
      const old=JSON.parse(raw);
      if(old&&typeof old==="object"){
        s={...s,...old,skills:{...s.skills,...(old.skills||{})}};
        s.words=(old.words&&typeof old.words==="object"&&!Array.isArray(old.words))?old.words:{};
        s.completed=Array.isArray(old.completed)?old.completed.filter(n=>Number.isInteger(n)&&n>=0&&n<UNITS.length):[];
        s.xp=cleanNum(s.xp);s.unlocked=Math.min(3,cleanNum(s.unlocked,3));s.attempts=cleanNum(s.attempts);s.correct=cleanNum(s.correct);s.streak=cleanNum(s.streak,10000);s.dailyXp=cleanNum(s.dailyXp);
      }
    }else{
      // Carry across real XP and discovered words from the first version.
      s.xp=cleanNum(localStorage.getItem("xp"));
      const discovered=cleanNum(localStorage.getItem("words"),WORDS.length);
      const originalOrder=["sava","naro","kelo","vexa","zani","baga","dumo","mira","luma","sora","torga","moro","liti","nika","mi","tu","la","wi","nemi","saki","vora","nava","rava","meka"];
      originalOrder.slice(0,discovered).forEach(id=>s.words[id]={seen:1,correct:0,wrong:0,level:0,consecutive:0,dueAt:0,lastPracticed:0,lastWrong:0});
      // Earlier versions incorrectly added a streak on every lesson, so do not import that number.
    }
  }catch(e){console.warn("Could not load local progress:",e);}
  if(s.dailyDay!==today()){s.dailyDay=today();s.dailyXp=0;}
  return s;
}
let state=loadState(),session=null;
function save(){try{localStorage.setItem(STORE_KEY,JSON.stringify(state));}catch(e){console.warn("Could not save progress:",e);}}
function getStat(id){
  if(!state.words[id]||typeof state.words[id]!=="object")state.words[id]={seen:0,correct:0,wrong:0,level:0,consecutive:0,dueAt:0,lastPracticed:0,lastWrong:0};
  return state.words[id];
}
function discovered(){return WORDS.filter(w=>getStat(w.id).seen>0);}
function dueWords(){const now=Date.now();return discovered().filter(w=>getStat(w.id).dueAt<=now);}
function weakWords(){return discovered().filter(w=>getStat(w.id).wrong>0).sort((a,b)=>weakScore(b)-weakScore(a));}
function weakScore(w){const s=getStat(w.id);return s.wrong*3-s.correct*.35+(s.lastWrong?Math.max(0,3-(Date.now()-s.lastWrong)/86400000):0);}
function masteredWords(){return discovered().filter(w=>getStat(w.id).level>=3).length;}
// Spiral practice deliberately brings old vocabulary into every later lesson,
// even if a word is not currently scheduled as due by spaced repetition.
function chooseSpiralWords(unit){
  const older=discovered().filter(w=>w.unit!==unit&&w.unit<=state.unlocked);
  const weak=older.filter(w=>getStat(w.id).wrong>0)
    .sort((a,b)=>weakScore(b)-weakScore(a)||getStat(a.id).lastSpiralAt-getStat(b.id).lastSpiralAt);
  const remaining=older.filter(w=>!weak.includes(w))
    .sort((a,b)=>(getStat(a.id).lastSpiralAt||0)-(getStat(b.id).lastSpiralAt||0)||
                    (getStat(a.id).level||0)-(getStat(b.id).level||0));
  const selected=[...weak.slice(0,2),...remaining.slice(0,Math.max(0,4-Math.min(2,weak.length)))].slice(0,4);
  for(const w of selected){
    const stat=getStat(w.id);
    stat.lastSpiralAt=Date.now();
    stat.spiralCount=cleanNum(stat.spiralCount)+1;
  }
  if(selected.length)save();
  return selected;
}
// Keep the actual translation visible on feedback — in both directions.
function meaningCard(w,title="Remember this word"){
  if(!w)return "";
  return '<div class="meaning-recap"><span class="step-label">'+esc(title)+'</span>'+
    '<div class="recap-pair"><strong>'+esc(w.id)+'</strong><span>means</span><strong>'+esc(w.en)+'</strong></div>'+
    '<p>Example: <em>'+esc(w.example)+'</em></p>'+
    '<p class="recap-tip">'+esc(w.hint)+'</p></div>';
}
function sentenceMeaningCards(q){
  if(!q.parts)return "";
  const ids=[...new Set(q.parts)];
  return '<div class="meaning-recap"><span class="step-label">WORD-BY-WORD REMINDER</span><div class="recap-chips">'+ids.map(id=>{
    const w=wordById(id);return w?'<span class="recap-chip"><b>'+esc(w.id)+'</b> = '+esc(w.en)+'</span>':"";
  }).join("")+'</div></div>';
}

function accuracy(){return state.attempts?Math.round(state.correct/state.attempts*100)+"%":"—";}
function refreshDay(){if(state.dailyDay!==today()){state.dailyDay=today();state.dailyXp=0;save();}}
function shownStreak(){
  if(!state.lastDay)return 0;
  const diff=dayNumber(today())-dayNumber(state.lastDay);
  return diff<=1?state.streak:0;
}
function addStreak(){
  const now=today();const prev=state.lastDay;
  if(prev===now)return;
  state.streak=prev&&dayNumber(now)-dayNumber(prev)===1?state.streak+1:1;
  state.lastDay=now;
}
function awardXp(amount){
  refreshDay();state.xp+=amount;state.dailyXp+=amount;
  if(session)session.gainedXp+=amount;
  save();updateHeader();
}
function updateHeader(){$("header-xp").textContent=state.xp;$("header-streak").textContent=shownStreak();}
function showScreen(name){
  if(session&&name!=="lessonScreen")session=null;
  document.querySelectorAll(".screen").forEach(el=>el.classList.toggle("active",el.id===name));
  document.querySelectorAll(".nav").forEach(el=>el.classList.toggle("active",el.dataset.screen===name));
  $("app").classList.toggle("in-lesson",name==="lessonScreen");
  if(name==="home")renderHome();
  if(name==="review")renderReview();
  if(name==="vocab")renderDictionary();
  if(name==="progressScreen")renderProgressDetails();
  window.scrollTo({top:0,behavior:"instant"});
}
function renderHome(){
  refreshDay();updateHeader();
  $("home-words").textContent=discovered().length;
  $("home-accuracy").textContent=accuracy();
  $("home-due").textContent=dueWords().length;
  $("todayXP").textContent=state.dailyXp;
  $("dailyBar").style.width=Math.min(100,state.dailyXp/GOAL*100)+"%";
  $("resumeText").textContent=state.dailyXp>=GOAL?"Daily goal reached. Great consistency!":"Next up: "+UNITS[state.unlocked].name;
  $("reviewTeaser").textContent=dueWords().length?dueWords().length+" words are ready to revisit. Smart reviews focus on what you need most.":weakWords().length?"No reviews due right now. You can still practice your trickiest words.":"Words you miss will automatically come back for extra practice.";
  $("coursePath").innerHTML=UNITS.map((u,i)=>{
    const locked=i>state.unlocked,done=state.completed.includes(i);
    const learned=unitWords(i).filter(w=>getStat(w.id).seen>0).length;
    const badge=locked?"LOCKED":done?"COMPLETED":i===state.unlocked?"UP NEXT":"REPLAY";
    return '<button class="unit-card '+(locked?"locked":done?"completed":"current")+'" '+(locked?"disabled":"onclick=\"startLesson("+i+")\"")+' aria-label="'+esc(u.name)+(locked?", locked":", start lesson")+'"><span class="unit-icon">'+(locked?"🔒":done?"✓":i+1)+'</span><span class="unit-info"><strong>'+esc(u.name)+'</strong><span>'+esc(u.subtitle)+' · '+learned+'/'+unitWords(i).length+' discovered</span></span><span class="unit-meta">'+badge+'</span></button>';
  }).join("");
  $("homePrimary").innerHTML=(state.completed.includes(state.unlocked)&&state.unlocked===3?"Practice final unit":"Continue learning")+' <span aria-hidden="true">→</span>';
}
function renderDictionary(){
  const known=discovered();
  $("dictionary").innerHTML=known.length?known.map(w=>'<div class="dictionary-entry"><strong>'+esc(w.id)+'</strong><span class="english">'+esc(w.en)+'</span><div class="entry-meta"><span class="pill">'+esc(UNITS[w.unit].label)+'</span><span>Mastery level '+cleanNum(getStat(w.id).level,6)+'/6</span></div></div>').join(""):'<div class="empty-state"><strong>Your dictionary is waiting!</strong><p>Start a lesson to discover your first words.</p><button class="primary" onclick="startLesson()">Learn first words</button></div>';
}
function renderReview(){
  const due=dueWords(),weak=weakWords(),known=discovered();
  $("reviewSummary").innerHTML='<div class="stat"><span>Due for review</span><strong>'+due.length+'</strong><small>Ready now</small></div><div class="stat"><span>Words with mistakes</span><strong>'+weak.length+'</strong><small>Worth revisiting</small></div><div class="stat"><span>Growing stronger</span><strong>'+masteredWords()+'</strong><small>Level 3 or above</small></div>';
  let entries=shuffle(known).sort((a,b)=>{
    const da=due.includes(a),db=due.includes(b);
    if(da!==db)return db-da;
    return weakScore(b)-weakScore(a);
  });
  $("reviewList").innerHTML=entries.length?entries.map(w=>{
    const s=getStat(w.id),dueNow=s.dueAt<=Date.now();
    return '<div class="review-entry"><strong>'+esc(w.id)+'</strong><span class="english">'+esc(w.en)+'</span><div class="entry-meta"><span class="pill '+(s.wrong?"weak":"")+'">'+(dueNow?"Ready to review":s.wrong?"Needs practice":"On track")+'</span><span>'+cleanNum(s.wrong)+' missed · '+cleanNum(s.correct)+' correct</span></div></div>';
  }).join(""):'<div class="empty-state"><strong>No mistakes yet</strong><p>Learn a few words first and your personal review list will appear here.</p><button class="primary" onclick="startLesson()">Start learning</button></div>';
}
function renderProgressDetails(){
  const s=state;
  $("progressDetails").innerHTML='<div class="progress-stats"><div class="panel"><span class="eyebrow">TOTAL XP</span><strong>'+s.xp+'</strong><p>Earn XP by answering correctly.</p></div><div class="panel"><span class="eyebrow">CURRENT STREAK</span><strong>'+shownStreak()+' days</strong><p>Practice on consecutive days to keep it going.</p></div><div class="panel"><span class="eyebrow">LESSONS FINISHED</span><strong>'+cleanNum(s.lessons)+'</strong><p>Full course lessons completed.</p></div><div class="panel"><span class="eyebrow">REVIEW SESSIONS</span><strong>'+cleanNum(s.reviews)+'</strong><p>Extra practice sessions completed.</p></div></div><div class="panel"><h3>Course progress</h3>'+UNITS.map((u,i)=>'<div class="skill-row"><span>'+esc(u.name)+'</span><b>'+(s.completed.includes(i)?"Completed":i<=s.unlocked?"In progress":"Locked")+'</b></div>').join("")+'</div><div class="panel" style="margin-top:16px"><h3>Learning breakdown</h3><div class="skill-row"><span>Words discovered</span><b>'+discovered().length+' / '+WORDS.length+'</b></div><div class="skill-row"><span>Words at mastery level 3+</span><b>'+masteredWords()+'</b></div><div class="skill-row"><span>Overall accuracy</span><b>'+accuracy()+'</b></div><div class="skill-row"><span>Sentence practice</span><b>'+cleanNum(s.skills.sentenceCorrect)+' right · '+cleanNum(s.skills.sentenceWrong)+' wrong</b></div></div>';
}
function markSeen(id){const s=getStat(id);if(!s.seen){s.seen=1;s.dueAt=0;save();}}
function recordWord(id,ok){
  const s=getStat(id);s.seen=1;s.lastPracticed=Date.now();
  state.attempts++;
  if(ok){
    state.correct++;s.correct=cleanNum(s.correct)+1;s.consecutive=cleanNum(s.consecutive)+1;
    s.level=Math.min(6,cleanNum(s.level,6)+1);
    const days=[0,1,3,7,14,30,60][s.level];
    s.dueAt=Date.now()+days*86400000;
  }else{
    s.wrong=cleanNum(s.wrong)+1;s.consecutive=0;s.level=Math.max(0,cleanNum(s.level,6)-1);
    s.lastWrong=Date.now();s.dueAt=Date.now()+5*60000;
  }
  save();
}
function recordSentence(ok){
  state.attempts++;if(ok){state.correct++;state.skills.sentenceCorrect=cleanNum(state.skills.sentenceCorrect)+1;}
  else state.skills.sentenceWrong=cleanNum(state.skills.sentenceWrong)+1;
  save();
}
function progress(value){
  if(!session)return;
  session.maxProgress=Math.max(session.maxProgress||0,value);
  $("lessonProgress").style.width=Math.min(100,session.maxProgress)+"%";
  document.querySelector(".lesson-progress").setAttribute("aria-valuenow",Math.round(session.maxProgress));
  $("lessonHearts").textContent=session.hearts;
}
function setLessonScreen(){
  document.querySelectorAll(".screen").forEach(el=>el.classList.toggle("active",el.id==="lessonScreen"));
  document.querySelectorAll(".nav").forEach(el=>el.classList.remove("active"));
  $("app").classList.add("in-lesson");window.scrollTo(0,0);
}
function startLesson(unit=state.unlocked){
  unit=Number(unit);
  if(!Number.isInteger(unit)||unit<0||unit>state.unlocked||unit>=UNITS.length)return;
  const recurring=chooseSpiralWords(unit);
  const teaching=[...recurring,...unitWords(unit).filter(w=>!getStat(w.id).seen)];
  const queue=[];
  unitWords(unit).forEach((w,i)=>queue.push(makeWordQuestion(w,i%3===2?"typing":"choice",i%2===0,0,unit)));
  queue.push(makeMatchQuestion(shuffle(unitWords(unit)).slice(0,3)));
  const available=SENTENCES.filter(x=>x.unit<=unit);
  if(available.length)queue.push(makeSentenceQuestion(shuffle(available)[0]));
  if(unit===3&&available.length>1)queue.push(makeSentenceQuestion(shuffle(available.filter(x=>x.unit===3))[0]));
  // Each cross-unit reminder is both re-taught and re-tested.
  // Alternate question directions so remembering is not just answer recognition.
  recurring.forEach((w,i)=>queue.push(makeWordQuestion(w,i%2===0?"typing":"choice",i%2===0,0,unit)));
  session={mode:"course",unit,teaching,spiralIds:recurring.map(w=>w.id),teachIndex:0,queue:shuffle(queue),initialTotal:queue.length,answered:0,rightCount:0,mistakes:0,hearts:5,gainedXp:0,locked:false,current:null,maximum:0,maxProgress:0,picked:[],match:null};
  setLessonScreen();$("lessonHeartWrap").classList.remove("hidden");
  if(teaching.length)renderTeach();else renderNext();
}
function startReview(mode="smart"){
  let candidates;
  if(mode==="mistakes")candidates=weakWords();
  else candidates=dueWords().sort((a,b)=>weakScore(b)-weakScore(a));
  if(!candidates.length&&mode==="smart")candidates=weakWords();
  if(!candidates.length&&mode==="smart")candidates=discovered().sort((a,b)=>getStat(a.id).lastPracticed-getStat(b.id).lastPracticed);
  if(!candidates.length){showScreen("review");return;}
  const focus=candidates.slice(0,10);
  const queue=focus.map((w,i)=>makeWordQuestion(w,i%3===0?"typing":"choice",i%2===0,0,Math.max(state.unlocked,w.unit)));
  if(focus.length>=3)queue.push(makeMatchQuestion(shuffle(focus).slice(0,3)));
  const eligible=SENTENCES.filter(s=>s.parts.every(id=>getStat(id).seen));
  if(eligible.length)queue.push(makeSentenceQuestion(shuffle(eligible)[0]));
  session={mode:"review",unit:state.unlocked,teaching:[],teachIndex:0,queue:shuffle(queue),initialTotal:queue.length,answered:0,rightCount:0,mistakes:0,hearts:5,gainedXp:0,locked:false,current:null,maxProgress:0,picked:[],match:null};
  setLessonScreen();$("lessonHeartWrap").classList.add("hidden");renderNext();
}
function makeWordQuestion(w,kind="choice",reverse=false,retry=0,unit=state.unlocked){
  const direction=kind==="typing"?true:reverse;
  const answer=direction?w.id:w.en;
  const pool=WORDS.filter(x=>x.unit<=Math.max(unit,w.unit)&&x.id!==w.id).map(x=>direction?x.id:x.en);
  const choices=shuffle([answer,...shuffle([...new Set(pool.filter(x=>x!==answer))]).slice(0,3)]);
  return{kind:kind==="typing"?"typing":"choice",category:"word",wordId:w.id,reverse:direction,answer,choices,retry,
    prompt:direction?"How do you say “"+w.en+"” in Darbenese?":"What does “"+w.id+"” mean?",
    hint:w.hint};
}
function makeSentenceQuestion(s,retry=0){
  const other=WORDS.filter(w=>!s.parts.includes(w.id)&&w.unit<=s.unit);
  const extra=other.length?shuffle(other)[0].id:null;
  return{kind:"order",category:"sentence",retry,prompt:"Translate: “"+s.en+"”",answer:s.parts.join(" "),parts:s.parts.slice(),tiles:shuffle(extra?s.parts.concat(extra):s.parts),hint:s.hint};
}
function makeMatchQuestion(pairWords){
  return{kind:"match",category:"match",retry:0,wordIds:pairWords.map(w=>w.id),prompt:"Match each Darbenese word to its meaning.",hint:"Choose one word from each column."};
}
function renderTeach(){
  const w=session.teaching[session.teachIndex];
  if(!w){renderNext();return;}
  markSeen(w.id);
  progress(4+14*(session.teachIndex+1)/session.teaching.length);
  const recurring=session.spiralIds?.includes(w.id);
  const intro=recurring?"WORD REMINDER":"NEW WORD";
  const title=recurring?"Remember this one?":"Meet a new word";
  const note=recurring?"You've seen this word before. It can appear again in today's questions and in later lessons.":w.hint;
  $("quiz").innerHTML='<div class="teachbox"><span class="step-label">'+intro+' · '+(session.teachIndex+1)+' OF '+session.teaching.length+'</span><h2>'+title+'</h2><div class="word-card"><div class="term">'+esc(w.id)+'</div><div class="meaning">'+esc(w.en)+'</div><div class="example">Example: '+esc(w.example)+'</div></div><p class="tip">'+esc(note)+'</p>'+(recurring?'<p class="recap-tip teach-tip">'+esc(w.hint)+'</p>':"")+'<button class="continue block" onclick="nextTeach()">Got it, continue →</button><button class="text-button" onclick="skipTeach()">Skip word introductions</button></div>';
}
function nextTeach(){if(!session)return;session.teachIndex++;if(session.teachIndex>=session.teaching.length)renderNext();else renderTeach();}
function skipTeach(){if(!session)return;session.teaching.forEach(w=>markSeen(w.id));session.teachIndex=session.teaching.length;renderNext();}
function renderNext(){
  if(!session)return;
  if(!session.queue.length){finishSession();return;}
  session.current=session.queue[0];session.locked=false;session.picked=[];session.match={left:null,right:null,done:new Set(),hadError:false};
  const q=session.current;
  const remaining=session.queue.length;
  progress(20+Math.floor(76*session.answered/(session.answered+remaining)));
  const label=(session.mode==="course"?"LESSON":"PERSONAL REVIEW")+' · QUESTION '+(session.answered+1)+' OF '+(session.answered+remaining)+(q.retry?" · EXTRA PRACTICE":"");
  let body="";
  if(q.kind==="choice")body='<div class="quiz-option-list">'+q.choices.map((v,i)=>'<button class="answer" data-answer="'+i+'" onclick="answerChoice('+i+')">'+esc(v)+'</button>').join("")+'</div>';
  if(q.kind==="typing")body='<input id="typedAnswer" class="type-input" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Type your answer..." aria-label="Answer in Darbenese"><div class="form-hint">Spelling matters, but capitals and punctuation do not.</div><div class="question-actions"><button class="primary" onclick="submitTyped()">Check answer</button></div>';
  if(q.kind==="order")body='<p class="question-help">Tap the words in the correct order. Tap a placed word to undo it.</p><div id="tileBuilt" class="sentence-built"></div><div id="tilePicker" class="tiles"></div><div class="question-actions"><button class="primary" onclick="submitOrder()">Check sentence</button></div>';
  if(q.kind==="match"){
    const left=shuffle(q.wordIds),right=shuffle(q.wordIds);
    body='<p class="question-help">Pick a word on the left, then its translation on the right.</p><div class="match-columns"><div class="match-column">'+left.map(id=>'<button class="answer" data-word="'+id+'" data-side="left" onclick="selectMatch(\'left\',\''+id+'\')">'+esc(id)+'</button>').join("")+'</div><div class="match-column">'+right.map(id=>'<button class="answer" data-word="'+id+'" data-side="right" onclick="selectMatch(\'right\',\''+id+'\')">'+esc(wordById(id).en)+'</button>').join("")+'</div></div><p class="match-notice" id="matchNotice" aria-live="polite"></p>';
  }
  $("quiz").innerHTML='<div class="question-card"><span class="step-label">'+esc(label)+'</span><h2>'+esc(q.prompt)+'</h2>'+body+'<div id="feedback" aria-live="polite"></div></div>';
  if(q.kind==="order")renderTiles();
  if(q.kind==="typing"){
    const el=$("typedAnswer");
    el.addEventListener("keydown",e=>{if(e.key==="Enter")submitTyped();});
    el.focus();
  }
}
function answerChoice(i){
  if(!session||session.locked)return;
  const q=session.current;
  if(q.kind!=="choice")return;
  const guess=q.choices[i];
  document.querySelectorAll("[data-answer]").forEach(btn=>{
    btn.disabled=true;
    const value=q.choices[Number(btn.dataset.answer)];
    if(value===q.answer)btn.classList.add("correct");
    else if(value===guess)btn.classList.add("wrong");
  });
  finishAnswer(norm(guess)===norm(q.answer));
}
function submitTyped(){
  if(!session||session.locked||session.current.kind!=="typing")return;
  const field=$("typedAnswer"),guess=field.value.trim();
  if(!guess){field.focus();return;}
  field.disabled=true;
  finishAnswer(norm(guess)===norm(session.current.answer));
}
function renderTiles(){
  const q=session.current;
  $("tileBuilt").innerHTML=session.picked.length?session.picked.map((index,n)=>'<button class="tile" onclick="undoTile('+n+')">'+esc(q.tiles[index])+' ×</button>').join(""):'<span>Build your sentence here...</span>';
  $("tilePicker").innerHTML=q.tiles.map((word,i)=>'<button class="tile" '+(session.picked.includes(i)?"disabled":"onclick=\"pickTile("+i+")\"")+'>'+esc(word)+'</button>').join("");
}
function pickTile(index){if(!session||session.locked||session.picked.includes(index))return;session.picked.push(index);renderTiles();}
function undoTile(index){if(!session||session.locked)return;session.picked.splice(index,1);renderTiles();}
function submitOrder(){
  if(!session||session.locked||session.current.kind!=="order"||!session.picked.length)return;
  const guess=session.picked.map(i=>session.current.tiles[i]).join(" ");
  finishAnswer(norm(guess)===norm(session.current.answer));
}
function selectMatch(side,id){
  if(!session||session.locked||session.current.kind!=="match"||session.match.done.has(id))return;
  const m=session.match;m[side]=id;
  document.querySelectorAll("[data-side]").forEach(btn=>btn.classList.toggle("selected",!btn.disabled&&btn.dataset.side===side&&btn.dataset.word===id));
  if(!m.left||!m.right)return;
  if(m.left===m.right){
    m.done.add(id);recordWord(id,true);awardXp(6);
    document.querySelectorAll('[data-word="'+id+'"]').forEach(b=>{b.disabled=true;b.classList.remove("selected");b.classList.add("paired");});
    $("matchNotice").textContent="Nice match! Keep going.";
  }else{
    m.hadError=true;recordWord(m.left,false);session.mistakes++;session.hearts=Math.max(0,session.hearts-1);
    enqueueRetry(makeWordQuestion(wordById(m.left),"typing",true,1,Math.max(session.unit,wordById(m.left).unit)));
    const missed=wordById(m.left);
    $("matchNotice").innerHTML='<strong>Not quite!</strong> '+esc(missed.id)+' means <strong>'+esc(missed.en)+'</strong>. Example: '+esc(missed.example)+' Try again — this word will come back.';
  }
  m.left=null;m.right=null;
  document.querySelectorAll("[data-side]").forEach(b=>b.classList.remove("selected"));
  progress(session.maxProgress);
  if(m.done.size===session.current.wordIds.length){
    finishAnswer(!m.hadError,true);
  }
}
function enqueueRetry(question){
  if(!session)return;
  const exists=session.queue.slice(1).some(q=>q.retry&&q.category===question.category&&q.wordId===question.wordId&&q.answer===question.answer);
  if(!exists)session.queue.push(question);
}
function finishAnswer(ok,alreadyRecorded=false){
  if(!session||session.locked)return;
  const q=session.current;session.locked=true;session.answered++;
  if(ok&&!q.retry)session.rightCount++;
  if(!alreadyRecorded){
    if(q.category==="word")recordWord(q.wordId,ok);
    if(q.category==="sentence")recordSentence(ok);
    if(ok)awardXp(q.retry?6:12);
    else{
      session.mistakes++;
      session.hearts=Math.max(0,session.hearts-1);
      if(!q.retry){
        if(q.category==="word")enqueueRetry(makeWordQuestion(wordById(q.wordId),"typing",true,1,Math.max(session.unit,wordById(q.wordId).unit)));
        if(q.category==="sentence")enqueueRetry(makeSentenceQuestion(SENTENCES.find(s=>s.parts.join(" ")===q.answer),1));
      }
    }
  }
  if(q.category==="match"&&session.match.hadError)session.rightCount=Math.max(0,session.rightCount);
  progress(session.maxProgress);
  let expected=q.kind==="match"?"Every word matched.":q.kind==="order"?q.answer:q.answer;
  let help=q.hint||"";
  if(q.kind==="typing"&&q.reverse)help="Try remembering the Darbenese spelling without looking at the choices. "+help;
  if(q.kind==="match")help=session.match.hadError?"You will practice missed matches again at the end.":"Each correct pair strengthens your memory.";
  const label=ok?"Great work!":q.kind==="match"?"All pairs completed":"Not quite — let's learn it";
  const message=ok?(q.kind==="match"?"You connected all the pairs.":"Correct! "+help):"Correct answer: "+expected+". "+help+(q.retry?" We'll keep reviewing this word in later lessons.":" You'll get another chance to practise it.");
  const recap=q.category==="word"?meaningCard(wordById(q.wordId),ok?"QUICK MEANING RECAP":"THIS WORD MEANS"):
              q.category==="sentence"?sentenceMeaningCards(q):
              q.category==="match"&&session.match.hadError?'<div class="meaning-recap"><span class="step-label">MATCHING REMINDER</span>'+q.wordIds.map(id=>{
                const w=wordById(id);return '<p><b>'+esc(w.id)+'</b> means <b>'+esc(w.en)+'</b></p>';
              }).join("")+'</div>':"";
  $("feedback").innerHTML='<div class="feedback '+(ok?"":"error")+'"><strong>'+esc(label)+'</strong><p>'+esc(message)+'</p>'+recap+'<button class="continue" onclick="advanceQuestion()">Continue →</button></div>';
  $("feedback").scrollIntoView({behavior:"smooth",block:"nearest"});
}
function advanceQuestion(){if(!session||!session.locked)return;session.queue.shift();renderNext();}
function finishSession(){
  if(!session)return;
  const s=session;progress(100);
  if(s.mode==="course"){
    if(!state.completed.includes(s.unit))state.completed.push(s.unit);
    state.unlocked=Math.max(state.unlocked,Math.min(UNITS.length-1,s.unit+1));
    state.lessons=cleanNum(state.lessons)+1;
  }else state.reviews=cleanNum(state.reviews)+1;
  if(s.answered)addStreak();
  save();updateHeader();
  const rate=s.initialTotal?Math.round(s.rightCount/s.initialTotal*100):100;
  const title=s.mode==="course"?"Lesson complete!":"Review complete!";
  const note=s.mistakes?"You practiced "+s.mistakes+" mistake"+(s.mistakes===1?"":"s")+". Any tricky words will return for review.":"Nice work! Your next reviews will appear as your memory needs refreshing.";
  $("quiz").innerHTML='<div class="completion-card"><div class="trophy" aria-hidden="true">★</div><span class="step-label">KEEP IT UP</span><h2>'+title+'</h2><p>'+esc(note)+'</p><div class="result-stats"><div><b>+'+s.gainedXp+'</b><small>XP earned</small></div><div><b>'+rate+'%</b><small>First-try accuracy</small></div><div><b>'+shownStreak()+'</b><small>Day streak</small></div></div><button class="primary" onclick="showScreen(\'home\')">Back to course →</button><p class="complete-note">Your progress has been saved on this device.</p></div>';
  session=null;
}
function confirmExit(){
  if(!session){showScreen("home");return;}
  if(window.confirm("Exit this session? Word practice and XP are saved, but lesson completion will not be counted."))showScreen("home");
}
save();
renderHome();
