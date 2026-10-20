"use strict";
const ENGLISH_EQ_GROUPS=[["hello","hi","hey","hiya","heya","howdy","gday","g'day","yo","hello there","hi there","hey there","greetings","good morning","good afternoon","good evening"],["goodbye","bye","bye bye","farewell","see ya","see you","see you later","catch you later","talk to you later","goodbye for now"],["friend","buddy","mate","pal","bestie","chum","companion"],["food","meal","dish","snack","something to eat"],["game","video game","videogame"],["big","large","sizable"],["giant","huge","gigantic","enormous","massive","really big","very big","extremely big","super big","very large"],["small","little","tiny","miniature","mini","very small"],["good","great","awesome","fantastic","excellent","amazing","wonderful","nice"],["happy","glad","joyful","cheerful","delighted","pleased","very happy","really happy","super happy"],["sad","unhappy","upset","gloomy","miserable"],["like","enjoy","appreciate","be fond of"],["want","desire","wish for","would like"],["have","own","possess"],["see","notice","watch","observe","look at"],["go","head to","travel to"],["make","do","produce"],["fat","plump","portly"],["please","pls","plz","pretty please"],["thank you","thanks","thanks so much","thanks a lot","thanks very much","thanks heaps","thank you very much","thank you so much","thx","ty","thank u","thankyou","many thanks","much appreciated","cheers"],["stand","stand up","remain standing"],["strong","powerful","sturdy","robust"],["together","united","as one","side by side"],["fearless","unafraid","without fear"],["nighttime","at night"],["courage","bravery"],["beautiful","gorgeous","stunning","very pretty"],["pretty","lovely","attractive"],["love","adore","cherish"],["victory","triumph"],["secret","private information","hidden truth"],["tomorrow","the next day","next day"],["today","this day"],["remember","recall","recollect"],["brave","courageous","bold"],["always","forever","at all times"],["learn","study","gain knowledge"],["create","craft","invent","make something"],["hope","optimism"],["yes","yeah","yep","yup","certainly","sure thing","of course"],["no","nope","nah"],["welcome","you're welcome","you are welcome"],["help","assist","aid","lend a hand"],["fast","quick","rapid","speedy"],["slow","unhurried"],["quiet","silent","hushed"],["cold","chilly","freezing","icy"],["warm","cosy","cozy"],["clever","smart","intelligent"],["hard","difficult","challenging","tough"],["easy","simple","straightforward"],["people","persons","folks"],["child","kid","youngster"],["parent","mother","father","mum","mom","dad"],["house","home","residence"],["water","fresh water"],["fire","flames"],["music","melody"],["song","tune"],["speak","talk"],["listen","hear carefully"],["work","labor","labour"],["rest","relax","take a break"],["run","jog","sprint"],["walk","stroll"],["rain","rainfall"],["win","be victorious"],["fix","repair","mend"],["new","brand new"],["old","aged"],["finish","complete","end"],["start","begin","commence"],["give","hand over"],["take","pick up"],["open","unlock"],["close","shut"],["understand","comprehend","get the idea"],["know","be aware"],["think","ponder","consider"],["find","discover","locate"]];
const ENGLISH_EQ_EXPRESSIONS=[["we stand strong together","together we stand strong"],["we are strong together","together we stand strong"],["united we stand strong","together we stand strong"],["all of us stand strong together","together we stand strong"],["i want to go","i want go"],["i would like to go","i want go"],["we want to go","we want go"],["you want to go","you want go"],["i like video games","i like games"],["i like playing games","i like games"],["i love my friends","i love friends"],["nice to meet you","welcome"],["it is nice to meet you","welcome"]];
const ENGLISH_EQ_IRREGULAR=[["went","go"],["gone","go"],["saw","see"],["seen","see"],["made","make"],["had","have"],["did","do"],["done","do"],["took","take"],["taken","take"],["gave","give"],["given","give"],["ran","run"],["running","run"],["wrote","write"],["written","write"],["thought","think"],["knew","know"],["learnt","learn"],["built","build"]];

function equivalenceCase(original,target){
 const letters=original.replace(/[^A-Za-z]/g,"");
 if(letters.length>1&&letters===letters.toUpperCase())return target.toUpperCase();
 const parts=original.split(/\s+/);
 if(parts.length>1&&parts.every(x=>!/[A-Za-z]/.test(x)||/^[A-Z][a-z]*(?:['-][A-Z]?[a-z]+)*$/.test(x)))
   return target.replace(/\b[a-z]/g,x=>x.toUpperCase());
 if(/^[A-Z]/.test(original))return target[0].toUpperCase()+target.slice(1);
 return target;
}
function EnglishPlural(word){
 if(/(?:s|sh|ch|x|z)$/.test(word))return word+"es";
 if(/[^aeiou]y$/.test(word))return word.slice(0,-1)+"ies";
 return word+"s";
}
function EnglishVerbForms(word){
 const result=[word+"s"];
 if(/[^aeiou]y$/.test(word))result.push(word.slice(0,-1)+"ies",word.slice(0,-1)+"ied");
 else result.push(word.endsWith("e")?word+"d":word+"ed");
 result.push(word.endsWith("e")&&!word.endsWith("ee")?word.slice(0,-1)+"ing":word+"ing");
 return result;
}
const oldTranslationPairs=translationPairs;
translationPairs=function(direction){
 const originals=oldTranslationPairs(direction);
 if(direction!=="en")return originals;
 const exact=new Map(originals.map(p=>[p.source.toLowerCase(),p]));
 const aliases=new Map();
 const get=term=>exact.get(term.toLowerCase())||aliases.get(term.toLowerCase());
 const add=(text,original)=>{
   if(!text||!original||exact.has(text.toLowerCase())||aliases.has(text.toLowerCase()))return;
   aliases.set(text.toLowerCase(),{...original,source:text});
 };
 for(const [primary,...variants] of ENGLISH_EQ_GROUPS)
   for(const variant of variants)add(variant,get(primary));
 for(const [variant,primary] of ENGLISH_EQ_IRREGULAR)add(variant,get(primary));
 for(const w of ATLAS_WORDS){
   if(!w.category)continue;
   for(const base of w.en.split(" / ").filter(v=>/^[a-z]+$/i.test(v))){
     const value=get(base);
     if(!value)continue;
     if(w.category.includes("noun"))add(EnglishPlural(base),value);
     if(w.category.includes("verb"))
       for(const variant of EnglishVerbForms(base))add(variant,value);
   }
 }
 for(const [contraction,subject] of [
   ["i'm","i"],["i’m","i"],["you're","you"],["you’re","you"],["we're","we"],["we’re","we"],
   ["they're","they"],["they’re","they"],["he's","he"],["he’s","he"],["she's","she"],["she’s","she"]
 ])add(contraction,get(subject));
 const compose=expression=>{
   const existing=get(expression);if(existing)return existing;
   const parts=expression.split(" ").map(get);
   if(parts.length<2||parts.some(x=>!x))return null;
   return{source:expression,target:parts.map(x=>x.target).join(" "),
     words:parts.map(x=>x.words).join(" "),phon:parts.map(x=>x.phon).join(" "),type:"phrase"};
 };
 for(const [source,canonical] of ENGLISH_EQ_EXPRESSIONS)add(source,compose(canonical));
 // Add common subject + adjective sentences to account for absent 'to be'.
 const subjects=[["i",["i am","i'm","i’m"]],["you",["you are","you're","you’re"]],
   ["we",["we are","we're","we’re"]],["he",["he is","he's","he’s"]],
   ["she",["she is","she's","she’s"]],["they",["they are","they're","they’re"]]];
 for(const [subject,forms] of subjects){
   for(const w of ATLAS_WORDS.filter(w=>w.category==="adjective")){
     const subjectWord=get(subject);
     if(!subjectWord)continue;
     const value={target:subjectWord.target+" "+w.id,words:subjectWord.words+" "+w.id,
       phon:subjectWord.phon+" "+w.pron,type:"phrase"};
     const synonyms=ENGLISH_EQ_GROUPS.find(g=>g[0]===w.en)||[w.en];
     for(const form of forms){
       add(form+" "+w.en,value);
       for(const synonymous of synonyms.slice(1))add(form+" "+synonymous,value);
     }
   }
 }
 return [...originals,...aliases.values()].sort((a,b)=>b.source.length-a.source.length);
};
translateRaw=function(input,direction){
 const pairs=translationPairs(direction);
 const escaped=s=>s.replace(/[\^$.*+?()[\]{}|]/g,"\\$&");
 const pattern=new RegExp("(?<![A-Za-z])("+pairs.map(x=>escaped(x.source)).join("|")+")(?![A-Za-z])","gi");
 const bySource=new Map(pairs.map(x=>[x.source.toLowerCase(),x]));
 let output="",last=0,matches=[],unmapped=[];
 for(const hit of input.matchAll(pattern)){
   if(hit.index<last)continue;
   const unmatched=input.slice(last,hit.index);
   output+=unmatched;unmapped.push(...(unmatched.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)||[]));
   const item=bySource.get(hit[0].toLowerCase());
   const rendered=equivalenceCase(hit[0],item.target);
   output+=rendered;matches.push({...item,rendered});last=hit.index+hit[0].length;
 }
 const rest=input.slice(last);
 output+=rest;unmapped.push(...(rest.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)||[]));
 return{output,matches,unmapped};
};
