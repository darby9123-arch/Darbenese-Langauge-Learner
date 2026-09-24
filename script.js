const words=[
["sava","hello"],["naro","goodbye"],["kelo","friend"],["vexa","game"],["zani","food"],["baga","big"],["dumo","giant"],["mira","good"],["luma","happy"],["sora","sad"],["torga","tall"],["moro","long"],["liti","small"],["nika","short"],["mi","I / me"],["tu","you"],["la","he / she / they"],["wi","we / us"],["nemi","want"],["saki","like"],["vora","have"],["nava","see"],["rava","go"],["meka","make / do"]
];
const lessonWords=words.slice(0,8);
let phase="learn",wordIndex=0,practiceIndex=0,correct=0,lessonHearts=5;
const $=id=>document.getElementById(id);
function show(id,btn){document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));$(id).classList.add("active");document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));if(btn)btn.classList.add("active");if(id==="vocab")renderDictionary();}
function goHome(){show("home",document.querySelector(".nav"));}
function startLesson(){phase="learn";wordIndex=0;practiceIndex=0;correct=0;lessonHearts=5;show("lesson");renderLearn();}
function progress(percent){$("progress").style.width=percent+"%";$("lessonHearts").textContent=lessonHearts;}
function renderLearn(){const w=lessonWords[wordIndex];progress((wordIndex+1)/lessonWords.length*30);$("quiz").innerHTML='<div class="teachbox"><div class="type">LEARN • '+(wordIndex+1)+' OF '+lessonWords.length+'</div><div class="word-card"><div class="darbenese-word">'+w[0]+'</div><div class="meaning">'+w[1]+'</div><div class="example">“'+exampleFor(w[0])+'”</div></div><p class="tip">Learn this word before moving on.</p><button class="continue" onclick="nextLearn()">'+(wordIndex===lessonWords.length-1?"CONTINUE":"NEXT")+' →</button></div>';}
function exampleFor(word){const examples={sava:"Sava, bruko!",naro:"Naro, kelo!",kelo:"Mi saki kelo.",vexa:"Mi saki vexa.",zani:"Tu nemi zani.",baga:"Baga vexa.",dumo:"Dumo baga.",mira:"Mira!"};return examples[word]||word;}
function nextLearn(){if(wordIndex<lessonWords.length-1){wordIndex++;renderLearn();}else{phase="practice";practiceIndex=0;renderPractice();}}
const practice=[
{kind:"select",prompt:"Tap the meaning of “sava”.",choices:["Hello","Goodbye","Food","Game"],correct:0},
{kind:"select",prompt:"Tap the Darbenese word for “goodbye”.",choices:["sava","naro","kelo","zani"],correct:1},
{kind:"match",prompt:"Match each word with its meaning.",pairs:[["kelo","friend"],["vexa","game"],["zani","food"]]},
{kind:"select",prompt:"Tap the meaning of “baga”.",choices:["Giant","Big","Happy","Long"],correct:1},
{kind:"tiles",prompt:"Build the sentence: “I like games.”",choices:["Mi","saki","vexa","naro"],correctOrder:["Mi","saki","vexa"]},
{kind:"select",prompt:"Tap the Darbenese word for “giant”.",choices:["baga","dumo","moro","liti"],correct:1},
{kind:"fill",prompt:"Complete: “Tu nemi ___.”",choices:["zani","vexa","kelo","sava"],correct:0}
];
function renderPractice(){const q=practice[practiceIndex];progress(30+(practiceIndex+1)/practice.length*40);let body="";if(q.kind==="select"||q.kind==="fill")body='<div class="answers">'+q.choices.map((x,n)=>'<button class="answer" onclick="practiceAnswer('+n+')">'+x+'</button>').join("")+'</div>';if(q.kind==="tiles")body='<div class="tiles" id="tiles">'+q.choices.map(x=>'<button onclick="pickTile(this)">'+x+'</button>').join("")+'</div><div id="built" class="built">Tap the words in order</div><button class="continue hidden" id="checkTiles" onclick="checkTiles()">CHECK</button>';if(q.kind==="match")body='<div class="match-grid">'+q.pairs.map((p,i)=>'<button class="match-word" onclick="matchWord('+i+')">'+p[0]+'</button><button class="match-meaning" onclick="matchMeaning('+i+')">'+p[1]+'</button>').join("")+'</div>';$("quiz").innerHTML='<div class="quizbox"><div class="type">PRACTICE • '+(practiceIndex+1)+' OF '+practice.length+'</div><h2>'+q.prompt+'</h2>'+body+'<div id="next"></div></div>';}
let selectedMatch=null,matched=new Set();
function matchWord(i){selectedMatch=i;document.querySelectorAll(".match-word").forEach((b,n)=>b.classList.toggle("selected",n===i));}
function matchMeaning(i){if(selectedMatch===null)return;if(selectedMatch===i){matched.add(i);document.querySelectorAll(".match-word,.match-meaning").forEach(b=>b.classList.remove("selected"));document.querySelectorAll(".match-word")[i].disabled=true;document.querySelectorAll(".match-meaning")[i].disabled=true;if(matched.size===practice[practiceIndex].pairs.length)handlePractice(true);}else{lessonHearts=Math.max(0,lessonHearts-1);$("lessonHearts").textContent=lessonHearts;}}
function practiceAnswer(n){const q=practice[practiceIndex];document.querySelectorAll(".answer").forEach((b,j)=>{b.disabled=true;if(j===q.correct)b.classList.add("correct");if(j===n&&n!==q.correct)b.classList.add("wrong");});handlePractice(n===q.correct);}
function pickTile(btn){if(btn.disabled)return;btn.disabled=true;btn.classList.add("selected");const built=$("#built");built.dataset.value=(built.dataset.value?built.dataset.value+" ":"")+btn.textContent;built.textContent=built.dataset.value;$("#checkTiles").classList.remove("hidden");}
function checkTiles(){handlePractice($("#built").dataset.value.trim()===practice[practiceIndex].correctOrder.join(" "));}
function handlePractice(ok){if(ok)correct++;else lessonHearts=Math.max(0,lessonHearts-1);$("lessonHearts").textContent=lessonHearts;$("next").innerHTML='<button class="continue" onclick="nextPractice()">CONTINUE</button>';}
function nextPractice(){practiceIndex++;if(practiceIndex>=practice.length){phase="test";renderTestIntro();}else{selectedMatch=null;matched=new Set();renderPractice();}}
function renderTestIntro(){progress(72);$("quiz").innerHTML='<div class="quizbox complete"><div class="type">FINAL TEST</div><h2>Ready for the final check?</h2><p>Now use what you learned without the teaching cards.</p><button class="continue" onclick="startTest()">START TEST →</button></div>';}
const test=[["What does “kelo” mean?",["friend","game","food","good"],0],["Which word means “big”?",["dumo","baga","mira","naro"],1],["What does “zani” mean?",["home","food","friend","game"],1]];
let testIndex=0;
function startTest(){testIndex=0;renderTest();}
function renderTest(){const q=test[testIndex];progress(72+(testIndex+1)/test.length*28);$("quiz").innerHTML='<div class="quizbox"><div class="type">TEST • '+(testIndex+1)+' OF '+test.length+'</div><h2>'+q[0]+'</h2><div class="answers">'+q[1].map((x,n)=>'<button class="answer" onclick="testAnswer('+n+')">'+x+'</button>').join("")+'</div><div id="next"></div></div>';}
function testAnswer(n){const q=test[testIndex];document.querySelectorAll(".answer").forEach((b,j)=>{b.disabled=true;if(j===q[2])b.classList.add("correct");if(j===n&&n!==q[2])b.classList.add("wrong");});if(n===q[2])correct++;else lessonHearts=Math.max(0,lessonHearts-1);$("lessonHearts").textContent=lessonHearts;$("next").innerHTML='<button class="continue" onclick="nextTest()">CONTINUE</button>';}
function nextTest(){testIndex++;if(testIndex>=test.length)finish();else renderTest();}
function finish(){const xp=correct*12;localStorage.xp=Number(localStorage.xp||0)+xp;localStorage.words=Math.min(words.length,Math.max(Number(localStorage.words||0),lessonWords.length));localStorage.streak=Number(localStorage.streak||0)+1;updateStats();$("quiz").innerHTML='<div class="quizbox complete"><div class="type">LESSON COMPLETE</div><h2>Lesson complete!</h2><p>You learned new words, practiced them in different ways, then finished with a final test.</p><div class="result"><b>'+xp+' XP</b><span>'+correct+'/'+(practice.length+test.length)+' correct</span></div><button class="continue" onclick="goHome()">BACK TO COURSE</button></div>';}
function updateStats(){$("xp").textContent=localStorage.xp||0;$("words").textContent=localStorage.words||0;$("streak").textContent=localStorage.streak||0;$("hearts").textContent=5;}
function renderDictionary(){$("dictionary").innerHTML=words.map(w=>'<div class="word"><b>'+w[0]+'</b><span>'+w[1]+'</span></div>').join("");}
updateStats();