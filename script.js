const words=[
["sava","hello"],["naro","goodbye"],["kelo","friend"],["vexa","game"],["zani","food"],["baga","big"],["dumo","giant"],["mira","good"],["luma","happy"],["sora","sad"],["torga","tall"],["moro","long"],["liti","small"],["nika","short"],["mi","I / me"],["tu","you"],["la","he / she / they"],["wi","we / us"],["nemi","want"],["saki","like"],["vora","have"],["nava","see"],["rava","go"],["meka","make / do"]
];

const lessonWords=words.slice(0,8);
let phase="teach", wordIndex=0, questionIndex=0, correct=0, lessonHearts=5;
const $=id=>document.getElementById(id);

function show(id,btn){document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));$(id).classList.add("active");document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));if(btn)btn.classList.add("active");if(id==="vocab")renderDictionary();}
function goHome(){show("home",document.querySelector(".nav"));}
function startLesson(){phase="teach";wordIndex=0;questionIndex=0;correct=0;lessonHearts=5;show("lesson");renderTeaching();}
function renderTeaching(){
  const w=lessonWords[wordIndex];
  $("progress").style.width=((wordIndex)/lessonWords.length*45)+"%";
  $("lessonHearts").textContent=lessonHearts;
  $("quiz").innerHTML=`<div class="teachbox"><div class="type">LEARN • ${wordIndex+1} OF ${lessonWords.length}</div><div class="word-card"><div class="darbenese-word">${w[0]}</div><div class="meaning">${w[1]}</div></div><p class="tip">Remember this word. You'll be tested on it next.</p><button class="continue" onclick="nextTeaching()">GOT IT →</button></div>`;
}
function nextTeaching(){if(wordIndex<lessonWords.length-1){wordIndex++;renderTeaching();}else{phase="quiz";questionIndex=0;renderQuestion();}}

const questions=[
{type:"meaning",prompt:"What does “sava” mean?",choices:["Hello","Goodbye","Food","Game"],correct:0},
{type:"reverse",prompt:"Choose the Darbenese word for “goodbye”.",choices:["sava","naro","kelo","zani"],correct:1},
{type:"meaning",prompt:"What does “kelo” mean?",choices:["Friend","Game","Big","Happy"],correct:0},
{type:"reverse",prompt:"Which word means “game”?",choices:["vexa","mira","nemi","rava"],correct:0},
{type:"meaning",prompt:"What does “zani” mean?",choices:["Home","Food","Friend","Long"],correct:1},
{type:"tiles",prompt:"Build: “I like games.”",choices:["Mi","saki","vexa","naro"],correctOrder:["Mi","saki","vexa"]},
{type:"reverse",prompt:"Which word means “big”?",choices:["dumo","baga","liti","moro"],correct:1},
{type:"fill",prompt:"Complete: “Tu nemi ___.” (You want food.)",choices:["zani","vexa","kelo","sava"],correct:0}
];

function renderQuestion(){
 const q=questions[questionIndex];
 $("progress").style.width=(45+(questionIndex/questions.length)*55)+"%";
 $("lessonHearts").textContent=lessonHearts;
 let body="";
 if(q.type==="tiles") body=`<div class="tiles" id="tiles">${q.choices.map(x=>`<button onclick="pickTile(this)">${x}</button>`).join("")}</div><div id="built" class="built">Tap the words in order</div><button class="continue hidden" id="checkTiles" onclick="checkTiles()">CHECK</button>`;
 else body=`<div class="answers">${q.choices.map((x,n)=>`<button class="answer" onclick="answer(${n})">${x}</button>`).join("")}</div>`;
 $("quiz").innerHTML=`<div class="quizbox"><div class="type">TEST • ${questionIndex+1} OF ${questions.length}</div><h2>${q.prompt}</h2>${body}<div id="next"></div></div>`;
}
function answer(n){
 const q=questions[questionIndex];
 document.querySelectorAll(".answer").forEach((b,j)=>{b.disabled=true;if(j===q.correct)b.classList.add("correct");if(j===n&&n!==q.correct)b.classList.add("wrong");});
 handleResult(n===q.correct);
}
function pickTile(btn){if(btn.disabled)return;btn.disabled=true;btn.classList.add("selected");const built=document.querySelector("#built");built.dataset.value=(built.dataset.value?built.dataset.value+" ":"")+btn.textContent;built.textContent=built.dataset.value;document.querySelector("#checkTiles").classList.remove("hidden");}
function checkTiles(){const built=document.querySelector("#built").dataset.value.trim();handleResult(built===questions[questionIndex].correctOrder.join(" "));}
function handleResult(ok){
 if(ok)correct++;else lessonHearts=Math.max(0,lessonHearts-1);
 $("lessonHearts").textContent=lessonHearts;
 $("next").innerHTML=`<button class="continue" onclick="nextQuestion()">CONTINUE</button>`;
}
function nextQuestion(){questionIndex++;if(questionIndex>=questions.length)finish();else renderQuestion();}
function finish(){
 const xp=correct*12;
 localStorage.xp=Number(localStorage.xp||0)+xp;
 localStorage.words=Math.min(words.length,Math.max(Number(localStorage.words||0),lessonWords.length));
 localStorage.streak=Number(localStorage.streak||0)+1;
 updateStats();
 $("quiz").innerHTML=`<div class="quizbox complete"><div class="type">LESSON COMPLETE</div><h2>Nice work!</h2><p>You learned the words first, then practiced them with meanings, translations, sentence building, and fill-in-the-blank.</p><div class="result"><b>${xp} XP</b><span>${correct}/${questions.length} correct</span></div><button class="continue" onclick="goHome()">BACK TO COURSE</button></div>`;
}
function updateStats(){$("xp").textContent=localStorage.xp||0;$("words").textContent=localStorage.words||0;$("streak").textContent=localStorage.streak||0;$("hearts").textContent=5;}
function renderDictionary(){$("dictionary").innerHTML=words.map(w=>`<div class="word"><b>${w[0]}</b><span>${w[1]}</span></div>`).join("");}
updateStats();