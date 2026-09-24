const lessons=[
 {q:"What does “sava” mean?",a:["Hello","Goodbye","Food","Game"],c:0},
 {q:"What does “naro” mean?",a:["Yes","Goodbye","Big","Friend"],c:1},
 {q:"Which word means “friend”?",a:["kelo","moro","zani","torga"],c:0},
 {q:"What does “vexa” mean?",a:["Home","Food","Game","Happy"],c:2},
 {q:"Which word means “big”?",a:["liti","baga","sora","nika"],c:1},
 {q:"Translate: “Mi saki vexa.”",a:["I like games.","I want food.","We go home.","You are happy."],c:0},
 {q:"What does “dumo” mean?",a:["Tiny","Friend","Giant","Sad"],c:2},
 {q:"Translate: “Tu nemi zani.”",a:["You want food.","You like games.","You go home.","You see a friend."],c:0}
];
const words=[["sava","hello"],["naro","goodbye"],["kelo","friend"],["vexa","game"],["zani","food"],["baga","big"],["dumo","giant"],["mira","good"],["luma","happy"],["sora","sad"],["torga","tall"],["moro","long"],["liti","small"],["nika","short"]];
let i=0,correct=0,lessonHearts=5;
const $=id=>document.getElementById(id);
function show(id,btn){document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));$(id).classList.add('active');document.querySelectorAll('.nav').forEach(x=>x.classList.remove('active'));if(btn)btn.classList.add('active');if(id==='vocab')renderDictionary();}
function goHome(){show('home',document.querySelector('.nav'))}
function startLesson(){i=0;correct=0;lessonHearts=5;show('lesson');renderQuestion()}
function renderQuestion(){if(i>=lessons.length){finish();return}const q=lessons[i];$('progress').style.width=((i)/lessons.length*100)+'%';$('lessonHearts').textContent=lessonHearts;$('quiz').innerHTML='<div class="quizbox"><div class="type">Lesson '+(i+1)+' of '+lessons.length+'</div><h2>'+q.q+'</h2><div class="answers">'+q.a.map((x,n)=>'<button class="answer" onclick="answer('+n+')">'+x+'</button>').join('')+'</div><div id="next"></div></div>'}
function answer(n){const q=lessons[i];document.querySelectorAll('.answer').forEach((b,j)=>{b.disabled=true;if(j===q.c)b.classList.add('correct');if(j===n&&n!==q.c)b.classList.add('wrong')});if(n===q.c){correct++;}else lessonHearts=Math.max(0,lessonHearts-1);$('lessonHearts').textContent=lessonHearts;$('next').innerHTML='<button class="continue" onclick="i++;renderQuestion()">CONTINUE</button>'}
function finish(){const xp=correct*10;const old=Number(localStorage.xp||0)+xp;localStorage.xp=old;localStorage.words=Math.min(words.length,Number(localStorage.words||0)+Math.max(1,correct));localStorage.streak=Number(localStorage.streak||0)+1;updateStats();$('quiz').innerHTML='<div class="quizbox" style="text-align:center"><div class="type">Lesson complete</div><h2>Nice work! 🎉</h2><p>You earned <b>'+xp+' XP</b> and got '+correct+'/'+lessons.length+' correct.</p><button class="continue" onclick="goHome()">BACK TO COURSE</button></div>'}
function updateStats(){$('xp').textContent=localStorage.xp||0;$('words').textContent=localStorage.words||0;$('streak').textContent=localStorage.streak||0}
function renderDictionary(){$('dictionary').innerHTML=words.map(w=>'<div class="word"><b>'+w[0]+'</b><span>'+w[1]+'</span></div>').join('')}
updateStats();