"use strict";
// All defined words are visible from day one, regardless of lesson progress.
const ATLAS_WORDS=[...WORDS,...DARBENESE_DICTIONARY_ROWS]
  .filter((w,i,a)=>a.findIndex(x=>x.id===w.id)===i)
  .map(w=>({...w,pron:darbenesePronunciation(w),category:w.category||atlasCategory(w)}))
  .sort((a,b)=>a.id.localeCompare(b.id));
function atlasCategory(w){
 if(["mi","tu","la","wi"].includes(w.id))return "pronoun";
 if(["sava","naro"].includes(w.id))return "expression";
 if(["nemi","saki","vora","nava","rava","meka"].includes(w.id))return "verb";
 if(["baga","dumo","mira","luma","sora","torga","moro","liti","nika","jarob"].includes(w.id))return "adjective";
 return "noun";
}
renderDictionary=function(){
 const search=norm($("dictionarySearch")?.value||"");
 const category=$("dictionaryCategory")?.value||"all";
 const matching=ATLAS_WORDS.filter(w=>{
   const kind=w.category;
   return(!search||norm(w.id).includes(search)||norm(w.en).includes(search)||norm(w.pron).includes(search))&&
     (category==="all"||kind===category||(category==="other"&&!["noun","verb","adjective","adverb","expression","time"].includes(kind)));
 });
 $("dictionaryCount").textContent=matching.length+" of "+ATLAS_WORDS.length+" defined words";
 $("dictionary").innerHTML=matching.map(w=>
  '<article class="dictionary-entry"><div class="entry-top"><span class="entry-tag">'+esc(w.category)+'</span>'+
  (Boolean(getStat(w.id).seen)?'<span class="entry-learned">✓ studied</span>':'<span class="entry-learned new">ready to explore</span>')+
  '</div><h3>'+esc(w.id)+'</h3><p class="entry-meaning">'+esc(w.en)+'</p>'+
  '<div class="entry-pron"><span>PRONOUNCE</span><strong>'+esc(w.pron)+'</strong></div>'+
  '<div class="entry-example">'+esc(w.example||"")+'</div>'+
  '<button class="entry-translate" onclick="translateWord(\''+esc(w.id)+'\')">Translate ↗</button></article>'
 ).join("")||'<div class="empty-state"><strong>No matching words</strong><p>Try another word or category.</p></div>';
};
let translateDirection="en",lastTranslation="";
function translationPairs(direction){
 const pairs=[];
 for(const p of DARBENESE_PHRASES)pairs.push({source:direction==="en"?p.en:p.dar,target:direction==="en"?p.dar:p.en,words:p.dar,phon:p.pron,type:"phrase"});
 for(const w of ATLAS_WORDS){
   if(direction==="en"){
     for(const english of [w.en,...w.en.split(" / ")])if(english.trim())pairs.push({source:english.trim(),target:w.id,words:w.id,phon:w.pron,type:"word"});
     if(w.id==="la")for(const alias of ["he","she","they","them"])pairs.push({source:alias,target:"la",words:"la",phon:w.pron,type:"word"});
   }else pairs.push({source:w.id,target:w.en.split(" / ")[0],words:w.id,phon:w.pron,type:"word"});
 }
 const unique=new Map();
 for(const p of pairs)if(!unique.has(p.source.toLowerCase()))unique.set(p.source.toLowerCase(),p);
 return [...unique.values()].sort((a,b)=>b.source.length-a.source.length);
}
function translateRaw(input,direction){
 const pairs=translationPairs(direction);
 const escaped=s=>s.replace(/[\^$.*+?()[\]{}|]/g,"\\$&");
 const regex=new RegExp("(?<![A-Za-z])("+pairs.map(p=>escaped(p.source)).join("|")+")(?![A-Za-z])","gi");
 const lookup=new Map(pairs.map(p=>[p.source.toLowerCase(),p]));
 let last=0,output="",matches=[],unmapped=[];
 for(const match of input.matchAll(regex)){
   if(match.index<last)continue;
   const before=input.slice(last,match.index);
   output+=before;unmapped.push(...(before.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)||[]));
   const p=lookup.get(match[0].toLowerCase());
   output+=p.target;matches.push(p);last=match.index+match[0].length;
 }
 const tail=input.slice(last);output+=tail;unmapped.push(...(tail.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)||[]));
 return{output,matches,unmapped};
}
function runTranslation(){
 const input=String($("translateInput")?.value||"").slice(0,500);
 $("translateCharacters").textContent=input.length+" / 500";
 if(!input.trim()){
   $("translatedText").textContent="Your translation will appear here.";
   $("translatePronunciation").textContent="Pronunciation will appear here for Darbenese text.";
   $("translationBreakdown").textContent="Translate a phrase to see what each word means.";
   $("translateStatus").textContent="Ready";lastTranslation="";return;
 }
 const result=translateRaw(input,translateDirection);
 lastTranslation=result.output;
 $("translatedText").textContent=result.output;
 const darText=translateDirection==="en"?result.output:input;
 const cues=(darText.match(/[A-Za-z]+/g)||[]).map(x=>ATLAS_WORDS.find(w=>w.id===x.toLowerCase())?.pron||"").filter(Boolean);
 const phrase=DARBENESE_PHRASES.find(p=>p.dar===norm(darText));
 $("translatePronunciation").textContent=phrase?.pron||cues.join(" · ")||"No pronunciation for unmapped text.";
 const unknown=[...new Set(result.unmapped.map(x=>x.toLowerCase()))];
 $("translateStatus").textContent=unknown.length?unknown.length+" unmapped word"+(unknown.length===1?"":"s"):"All matched";
 $("translationBreakdown").innerHTML=result.matches.map(p=>
   '<div class="translation-token"><strong>'+esc(p.words)+'</strong><span>'+
   esc(ATLAS_WORDS.find(w=>w.id===p.words)?.en||(translateDirection==="dar"?p.target:p.source))+
   '</span><small>'+esc(p.phon)+'</small></div>'
 ).join("")||"<p>No defined words found yet.</p>";
 if(unknown.length)$("translationBreakdown").innerHTML+='<p class="translation-warning">Unmapped: '+esc(unknown.slice(0,12).join(", "))+'. These words stay unchanged instead of being guessed.</p>';
}
function syncDirection(){
 $("languageFromLabel").textContent=translateDirection==="en"?"ENGLISH":"DARBENESE";
 $("languageToLabel").textContent=translateDirection==="en"?"DARBENESE":"ENGLISH";
 $("translateInput").placeholder=translateDirection==="en"?"Type hello or together we stand strong…":"Type sava or kushu macka lacka…";
}
function swapTranslate(){
 const previous=lastTranslation;translateDirection=translateDirection==="en"?"dar":"en";
 $("translateInput").value=previous||$("translateInput").value;
 syncDirection();runTranslation();
}
function clearTranslation(){$("translateInput").value="";runTranslation();}
function copyTranslation(){
 if(!lastTranslation)return;
 if(typeof navigator!=="undefined"&&navigator.clipboard?.writeText)
  navigator.clipboard.writeText(lastTranslation).then(()=>$("translateStatus").textContent="Copied")
    .catch(()=>$("translateStatus").textContent="Select the text to copy");
 else $("translateStatus").textContent="Select the result to copy";
}
function translateWord(word){
 translateDirection="dar";syncDirection();$("translateInput").value=word;showScreen("translate");runTranslation();
}
function tryTranslationExample(value,direction){
 translateDirection=direction;syncDirection();$("translateInput").value=value;runTranslation();
}
function setStudyMode(value){
 if(!["guided","standard"].includes(value))return;
 state.studyMode=value;save();renderHome();
}
function renderTopicOptions(){
 const select=$("reviewTopic");if(!select)return;
 const previous=select.value||"0";
 select.innerHTML=UNITS.map((u,i)=>'<option value="'+i+'">'+esc(u.name)+'</option>').join("");
 select.value=previous;
}
const atlasCoreShowScreen=showScreen;
showScreen=function(id,btn){
 atlasCoreShowScreen(id,btn);
 if(id==="translate"){syncDirection();runTranslation();}
 if(id==="review")renderTopicOptions();
};
const atlasCoreRenderHome=renderHome;
renderHome=function(){
 atlasCoreRenderHome();
 if($("studyMode"))$("studyMode").value=state.studyMode||"guided";
 if($("unitTotal"))$("unitTotal").textContent=UNITS.length+" chapters";
};
renderHome();renderTopicOptions();
