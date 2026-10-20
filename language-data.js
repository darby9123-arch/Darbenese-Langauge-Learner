"use strict";
// Darbenese is fictional; these are proposed definitions, not an external canon.
// The sequence "ou" always makes the "oo" sound, as in "moon".
const DARBENESE_COURSE=[
  {
    "id": "kushu",
    "en": "together",
    "category": "adverb",
    "pron": "KUH-shoo",
    "unit": 4,
    "example": "Kushu macka lacka!",
    "hint": "Remember: kushu means together."
  },
  {
    "id": "macka",
    "en": "stand",
    "category": "verb",
    "pron": "MAH-kuh",
    "unit": 4,
    "example": "Kushu macka lacka!",
    "hint": "Remember: macka means stand."
  },
  {
    "id": "lacka",
    "en": "strong",
    "category": "adjective",
    "pron": "LAH-kuh",
    "unit": 4,
    "example": "Kushu macka lacka!",
    "hint": "Remember: lacka means strong."
  },
  {
    "id": "pnuh",
    "en": "please",
    "category": "expression",
    "pron": "puh-NUH",
    "unit": 4,
    "example": "Pnuh.",
    "hint": "Remember: pnuh means please."
  },
  {
    "id": "dbwuh",
    "en": "thank you",
    "category": "expression",
    "pron": "duh-BWUH",
    "unit": 4,
    "example": "Dbwuh, kelo!",
    "hint": "Remember: dbwuh means thank you."
  },
  {
    "id": "pluh",
    "en": "again",
    "category": "adverb",
    "pron": "PLUH",
    "unit": 4,
    "example": "Pluh.",
    "hint": "Remember: pluh means again."
  },
  {
    "id": "reakles",
    "en": "fearless",
    "category": "adjective",
    "pron": "REE-uh-kless",
    "unit": 5,
    "example": "Reakles.",
    "hint": "Remember: reakles means fearless."
  },
  {
    "id": "nintouh",
    "en": "nighttime",
    "category": "noun",
    "pron": "nin-TOO",
    "unit": 5,
    "example": "Duh nintouh.",
    "hint": "Remember: nintouh means nighttime."
  },
  {
    "id": "lackbunth",
    "en": "courage",
    "category": "noun",
    "pron": "LAHK-bunth",
    "unit": 5,
    "example": "Lackbunth.",
    "hint": "Remember: lackbunth means courage."
  },
  {
    "id": "doutch",
    "en": "dream",
    "category": "noun",
    "pron": "DOOCH",
    "unit": 5,
    "example": "Doutch.",
    "hint": "Remember: doutch means dream."
  },
  {
    "id": "coutavuh",
    "en": "beautiful",
    "category": "adjective",
    "pron": "KOO-tah-vuh",
    "unit": 5,
    "example": "Coutavuh.",
    "hint": "Remember: coutavuh means beautiful."
  },
  {
    "id": "shmwah",
    "en": "love",
    "category": "noun / verb",
    "pron": "SHMWAH",
    "unit": 5,
    "example": "Mi shmwah kelo.",
    "hint": "Remember: shmwah means love."
  },
  {
    "id": "veedict",
    "en": "victory",
    "category": "noun",
    "pron": "VEE-dikt",
    "unit": 6,
    "example": "Veedict.",
    "hint": "Remember: veedict means victory."
  },
  {
    "id": "kneecadn",
    "en": "secret",
    "category": "noun",
    "pron": "NEE-kad-un",
    "unit": 6,
    "example": "Kneecadn.",
    "hint": "Remember: kneecadn means secret."
  },
  {
    "id": "duh",
    "en": "the",
    "category": "determiner",
    "pron": "DUH",
    "unit": 6,
    "example": "Duh.",
    "hint": "Remember: duh means the."
  },
  {
    "id": "donaek",
    "en": "tomorrow",
    "category": "time",
    "pron": "doh-NAYK",
    "unit": 6,
    "example": "Wi rava donaek.",
    "hint": "Remember: donaek means tomorrow."
  },
  {
    "id": "meero",
    "en": "today",
    "category": "time",
    "pron": "MEE-roh",
    "unit": 6,
    "example": "Meero.",
    "hint": "Remember: meero means today."
  },
  {
    "id": "kranto",
    "en": "remember",
    "category": "verb",
    "pron": "KRAHN-toh",
    "unit": 6,
    "example": "Kranto.",
    "hint": "Remember: kranto means remember."
  },
  {
    "id": "baraek",
    "en": "brave",
    "category": "adjective",
    "pron": "bah-RAYK",
    "unit": 7,
    "example": "Baraek.",
    "hint": "Remember: baraek means brave."
  },
  {
    "id": "toluh",
    "en": "always",
    "category": "adverb",
    "pron": "TOH-luh",
    "unit": 7,
    "example": "Toluh.",
    "hint": "Remember: toluh means always."
  },
  {
    "id": "vreeka",
    "en": "learn",
    "category": "verb",
    "pron": "VREE-kah",
    "unit": 7,
    "example": "Wi vreeka.",
    "hint": "Remember: vreeka means learn."
  },
  {
    "id": "ranou",
    "en": "moon",
    "category": "noun",
    "pron": "rah-NOO",
    "unit": 7,
    "example": "Duh ranou.",
    "hint": "Remember: ranou means moon."
  },
  {
    "id": "mektou",
    "en": "create",
    "category": "verb",
    "pron": "mek-TOO",
    "unit": 7,
    "example": "Mektou.",
    "hint": "Remember: mektou means create."
  },
  {
    "id": "shrava",
    "en": "hope",
    "category": "noun",
    "pron": "SHRAH-vah",
    "unit": 7,
    "example": "Shrava.",
    "hint": "Remember: shrava means hope."
  }
];
const DARBENESE_DICTIONARY_ROWS=[
  {
    "id": "mashku",
    "en": "team",
    "category": "noun",
    "pron": "MASH-koo",
    "unit": null,
    "example": "Mashku.",
    "hint": "mashku means team."
  },
  {
    "id": "lackun",
    "en": "power",
    "category": "noun",
    "pron": "LAH-kun",
    "unit": null,
    "example": "Lackun.",
    "hint": "lackun means power."
  },
  {
    "id": "kacka",
    "en": "hold",
    "category": "verb",
    "pron": "KAH-kuh",
    "unit": null,
    "example": "Kacka.",
    "hint": "kacka means hold."
  },
  {
    "id": "pnava",
    "en": "welcome",
    "category": "expression",
    "pron": "puh-NAH-vah",
    "unit": null,
    "example": "Pnava.",
    "hint": "pnava means welcome."
  },
  {
    "id": "vwuh",
    "en": "yes",
    "category": "expression",
    "pron": "VWUH",
    "unit": null,
    "example": "Vwuh.",
    "hint": "vwuh means yes."
  },
  {
    "id": "nahku",
    "en": "no",
    "category": "expression",
    "pron": "NAH-koo",
    "unit": null,
    "example": "Nahku.",
    "hint": "nahku means no."
  },
  {
    "id": "reaka",
    "en": "risk",
    "category": "noun",
    "pron": "REE-ah-kah",
    "unit": null,
    "example": "Reaka.",
    "hint": "reaka means risk."
  },
  {
    "id": "nintora",
    "en": "midnight",
    "category": "time",
    "pron": "nin-TOH-rah",
    "unit": null,
    "example": "Nintora.",
    "hint": "nintora means midnight."
  },
  {
    "id": "lackbar",
    "en": "shield",
    "category": "noun",
    "pron": "LAHK-bar",
    "unit": null,
    "example": "Lackbar.",
    "hint": "lackbar means shield."
  },
  {
    "id": "doutara",
    "en": "imagine",
    "category": "verb",
    "pron": "doo-TAH-rah",
    "unit": null,
    "example": "Doutara.",
    "hint": "doutara means imagine."
  },
  {
    "id": "coutala",
    "en": "pretty",
    "category": "adjective",
    "pron": "koo-TAH-lah",
    "unit": null,
    "example": "Coutala.",
    "hint": "coutala means pretty."
  },
  {
    "id": "veedra",
    "en": "win",
    "category": "verb",
    "pron": "VEE-drah",
    "unit": null,
    "example": "Veedra.",
    "hint": "veedra means win."
  },
  {
    "id": "kneeka",
    "en": "hide",
    "category": "verb",
    "pron": "NEE-kah",
    "unit": null,
    "example": "Kneeka.",
    "hint": "kneeka means hide."
  },
  {
    "id": "donala",
    "en": "yesterday",
    "category": "time",
    "pron": "doh-NAH-lah",
    "unit": null,
    "example": "Donala.",
    "hint": "donala means yesterday."
  },
  {
    "id": "shmeka",
    "en": "care",
    "category": "verb",
    "pron": "SHMEH-kah",
    "unit": null,
    "example": "Shmeka.",
    "hint": "shmeka means care."
  },
  {
    "id": "prouka",
    "en": "promise",
    "category": "noun",
    "pron": "PROO-kah",
    "unit": null,
    "example": "Prouka.",
    "hint": "prouka means promise."
  },
  {
    "id": "touluh",
    "en": "soon",
    "category": "time",
    "pron": "TOO-luh",
    "unit": null,
    "example": "Touluh.",
    "hint": "touluh means soon."
  },
  {
    "id": "doutan",
    "en": "sleep",
    "category": "verb",
    "pron": "DOO-tan",
    "unit": null,
    "example": "Doutan.",
    "hint": "doutan means sleep."
  },
  {
    "id": "nouka",
    "en": "night",
    "category": "noun",
    "pron": "NOO-kah",
    "unit": null,
    "example": "Nouka.",
    "hint": "nouka means night."
  },
  {
    "id": "makou",
    "en": "morning",
    "category": "noun",
    "pron": "mah-KOO",
    "unit": null,
    "example": "Makou.",
    "hint": "makou means morning."
  },
  {
    "id": "kouvah",
    "en": "sun",
    "category": "noun",
    "pron": "KOO-vah",
    "unit": null,
    "example": "Kouvah.",
    "hint": "kouvah means sun."
  },
  {
    "id": "nouta",
    "en": "star",
    "category": "noun",
    "pron": "NOO-tah",
    "unit": null,
    "example": "Nouta.",
    "hint": "nouta means star."
  },
  {
    "id": "krana",
    "en": "memory",
    "category": "noun",
    "pron": "KRAH-nah",
    "unit": null,
    "example": "Krana.",
    "hint": "krana means memory."
  },
  {
    "id": "moustu",
    "en": "cloud",
    "category": "noun",
    "pron": "MOOS-too",
    "unit": null,
    "example": "Moustu.",
    "hint": "moustu means cloud."
  },
  {
    "id": "toreka",
    "en": "rain",
    "category": "noun",
    "pron": "toh-REH-kah",
    "unit": null,
    "example": "Toreka.",
    "hint": "toreka means rain."
  },
  {
    "id": "shoun",
    "en": "snow",
    "category": "noun",
    "pron": "SHOON",
    "unit": null,
    "example": "Shoun.",
    "hint": "shoun means snow."
  },
  {
    "id": "braka",
    "en": "storm",
    "category": "noun",
    "pron": "BRAH-kah",
    "unit": null,
    "example": "Braka.",
    "hint": "braka means storm."
  },
  {
    "id": "lanou",
    "en": "sky",
    "category": "noun",
    "pron": "lah-NOO",
    "unit": null,
    "example": "Lanou.",
    "hint": "lanou means sky."
  },
  {
    "id": "doutarae",
    "en": "dreamer",
    "category": "noun",
    "pron": "doo-tah-RAY",
    "unit": null,
    "example": "Doutarae.",
    "hint": "doutarae means dreamer."
  },
  {
    "id": "verou",
    "en": "river",
    "category": "noun",
    "pron": "veh-ROO",
    "unit": null,
    "example": "Verou.",
    "hint": "verou means river."
  },
  {
    "id": "nalka",
    "en": "lake",
    "category": "noun",
    "pron": "NAHL-kah",
    "unit": null,
    "example": "Nalka.",
    "hint": "nalka means lake."
  },
  {
    "id": "moora",
    "en": "sea",
    "category": "noun",
    "pron": "MOO-rah",
    "unit": null,
    "example": "Moora.",
    "hint": "moora means sea."
  },
  {
    "id": "tavuh",
    "en": "flower",
    "category": "noun",
    "pron": "TAH-vuh",
    "unit": null,
    "example": "Tavuh.",
    "hint": "tavuh means flower."
  },
  {
    "id": "panka",
    "en": "tree",
    "category": "noun",
    "pron": "PAHN-kah",
    "unit": null,
    "example": "Panka.",
    "hint": "panka means tree."
  },
  {
    "id": "shour",
    "en": "forest",
    "category": "noun",
    "pron": "SHOOR",
    "unit": null,
    "example": "Shour.",
    "hint": "shour means forest."
  },
  {
    "id": "narka",
    "en": "mountain",
    "category": "noun",
    "pron": "NAR-kah",
    "unit": null,
    "example": "Narka.",
    "hint": "narka means mountain."
  },
  {
    "id": "voolu",
    "en": "valley",
    "category": "noun",
    "pron": "VOO-loo",
    "unit": null,
    "example": "Voolu.",
    "hint": "voolu means valley."
  },
  {
    "id": "touban",
    "en": "stone",
    "category": "noun",
    "pron": "TOO-ban",
    "unit": null,
    "example": "Touban.",
    "hint": "touban means stone."
  },
  {
    "id": "baneka",
    "en": "earth",
    "category": "noun",
    "pron": "bah-NEH-kah",
    "unit": null,
    "example": "Baneka.",
    "hint": "baneka means earth."
  },
  {
    "id": "yaro",
    "en": "water",
    "category": "noun",
    "pron": "YAH-roh",
    "unit": null,
    "example": "Yaro.",
    "hint": "yaro means water."
  },
  {
    "id": "horka",
    "en": "fire",
    "category": "noun",
    "pron": "HOR-kah",
    "unit": null,
    "example": "Horka.",
    "hint": "horka means fire."
  },
  {
    "id": "shinou",
    "en": "wind",
    "category": "noun",
    "pron": "shee-NOO",
    "unit": null,
    "example": "Shinou.",
    "hint": "shinou means wind."
  },
  {
    "id": "drouva",
    "en": "road",
    "category": "noun",
    "pron": "DROO-vah",
    "unit": null,
    "example": "Drouva.",
    "hint": "drouva means road."
  },
  {
    "id": "navaek",
    "en": "path",
    "category": "noun",
    "pron": "nah-VAYK",
    "unit": null,
    "example": "Navaek.",
    "hint": "navaek means path."
  },
  {
    "id": "kouta",
    "en": "house",
    "category": "noun",
    "pron": "KOO-tah",
    "unit": null,
    "example": "Kouta.",
    "hint": "kouta means house."
  },
  {
    "id": "planka",
    "en": "room",
    "category": "noun",
    "pron": "PLAN-kah",
    "unit": null,
    "example": "Planka.",
    "hint": "planka means room."
  },
  {
    "id": "mekra",
    "en": "door",
    "category": "noun",
    "pron": "MEH-krah",
    "unit": null,
    "example": "Mekra.",
    "hint": "mekra means door."
  },
  {
    "id": "touni",
    "en": "window",
    "category": "noun",
    "pron": "TOO-nee",
    "unit": null,
    "example": "Touni.",
    "hint": "touni means window."
  },
  {
    "id": "bouro",
    "en": "city",
    "category": "noun",
    "pron": "BOO-roh",
    "unit": null,
    "example": "Bouro.",
    "hint": "bouro means city."
  },
  {
    "id": "kalaek",
    "en": "village",
    "category": "noun",
    "pron": "kah-LAYK",
    "unit": null,
    "example": "Kalaek.",
    "hint": "kalaek means village."
  },
  {
    "id": "mokta",
    "en": "market",
    "category": "noun",
    "pron": "MOHK-tah",
    "unit": null,
    "example": "Mokta.",
    "hint": "mokta means market."
  },
  {
    "id": "kurea",
    "en": "school",
    "category": "noun",
    "pron": "koo-REH-ah",
    "unit": null,
    "example": "Kurea.",
    "hint": "kurea means school."
  },
  {
    "id": "laeta",
    "en": "book",
    "category": "noun",
    "pron": "LAY-tah",
    "unit": null,
    "example": "Laeta.",
    "hint": "laeta means book."
  },
  {
    "id": "velka",
    "en": "paper",
    "category": "noun",
    "pron": "VEL-kah",
    "unit": null,
    "example": "Velka.",
    "hint": "velka means paper."
  },
  {
    "id": "kroun",
    "en": "pen",
    "category": "noun",
    "pron": "KROON",
    "unit": null,
    "example": "Kroun.",
    "hint": "kroun means pen."
  },
  {
    "id": "mako",
    "en": "music",
    "category": "noun",
    "pron": "MAH-koh",
    "unit": null,
    "example": "Mako.",
    "hint": "mako means music."
  },
  {
    "id": "shoula",
    "en": "song",
    "category": "noun",
    "pron": "SHOO-lah",
    "unit": null,
    "example": "Shoula.",
    "hint": "shoula means song."
  },
  {
    "id": "rintou",
    "en": "dance",
    "category": "verb",
    "pron": "rin-TOO",
    "unit": null,
    "example": "Rintou.",
    "hint": "rintou means dance."
  },
  {
    "id": "veena",
    "en": "voice",
    "category": "noun",
    "pron": "VEE-nah",
    "unit": null,
    "example": "Veena.",
    "hint": "veena means voice."
  },
  {
    "id": "plina",
    "en": "listen",
    "category": "verb",
    "pron": "PLEE-nah",
    "unit": null,
    "example": "Plina.",
    "hint": "plina means listen."
  },
  {
    "id": "koutash",
    "en": "speak",
    "category": "verb",
    "pron": "KOO-tash",
    "unit": null,
    "example": "Koutash.",
    "hint": "koutash means speak."
  },
  {
    "id": "trinou",
    "en": "read",
    "category": "verb",
    "pron": "tree-NOO",
    "unit": null,
    "example": "Trinou.",
    "hint": "trinou means read."
  },
  {
    "id": "vreedou",
    "en": "write",
    "category": "verb",
    "pron": "vree-DOO",
    "unit": null,
    "example": "Vreedou.",
    "hint": "vreedou means write."
  },
  {
    "id": "koura",
    "en": "ask",
    "category": "verb",
    "pron": "KOO-rah",
    "unit": null,
    "example": "Koura.",
    "hint": "koura means ask."
  },
  {
    "id": "vaeka",
    "en": "answer",
    "category": "noun",
    "pron": "VAY-kah",
    "unit": null,
    "example": "Vaeka.",
    "hint": "vaeka means answer."
  },
  {
    "id": "moura",
    "en": "understand",
    "category": "verb",
    "pron": "MOO-rah",
    "unit": null,
    "example": "Moura.",
    "hint": "moura means understand."
  },
  {
    "id": "kneeta",
    "en": "know",
    "category": "verb",
    "pron": "NEE-tah",
    "unit": null,
    "example": "Kneeta.",
    "hint": "kneeta means know."
  },
  {
    "id": "drekka",
    "en": "think",
    "category": "verb",
    "pron": "DREH-kuh",
    "unit": null,
    "example": "Drekka.",
    "hint": "drekka means think."
  },
  {
    "id": "joulah",
    "en": "wonder",
    "category": "verb",
    "pron": "JOO-lah",
    "unit": null,
    "example": "Joulah.",
    "hint": "joulah means wonder."
  },
  {
    "id": "routa",
    "en": "travel",
    "category": "verb",
    "pron": "ROO-tah",
    "unit": null,
    "example": "Routa.",
    "hint": "routa means travel."
  },
  {
    "id": "skarou",
    "en": "run",
    "category": "verb",
    "pron": "SKAH-roo",
    "unit": null,
    "example": "Skarou.",
    "hint": "skarou means run."
  },
  {
    "id": "toupra",
    "en": "walk",
    "category": "verb",
    "pron": "TOO-prah",
    "unit": null,
    "example": "Toupra.",
    "hint": "toupra means walk."
  },
  {
    "id": "levka",
    "en": "jump",
    "category": "verb",
    "pron": "LEV-kah",
    "unit": null,
    "example": "Levka.",
    "hint": "levka means jump."
  },
  {
    "id": "dovra",
    "en": "rest",
    "category": "verb",
    "pron": "DOH-vrah",
    "unit": null,
    "example": "Dovra.",
    "hint": "dovra means rest."
  },
  {
    "id": "shanka",
    "en": "work",
    "category": "verb",
    "pron": "SHAHN-kah",
    "unit": null,
    "example": "Shanka.",
    "hint": "shanka means work."
  },
  {
    "id": "kerou",
    "en": "help",
    "category": "verb",
    "pron": "keh-ROO",
    "unit": null,
    "example": "Kerou.",
    "hint": "kerou means help."
  },
  {
    "id": "ramka",
    "en": "find",
    "category": "verb",
    "pron": "RAHM-kah",
    "unit": null,
    "example": "Ramka.",
    "hint": "ramka means find."
  },
  {
    "id": "noudra",
    "en": "lose",
    "category": "verb",
    "pron": "NOO-drah",
    "unit": null,
    "example": "Noudra.",
    "hint": "noudra means lose."
  },
  {
    "id": "bekra",
    "en": "bring",
    "category": "verb",
    "pron": "BEH-krah",
    "unit": null,
    "example": "Bekra.",
    "hint": "bekra means bring."
  },
  {
    "id": "tavka",
    "en": "give",
    "category": "verb",
    "pron": "TAHV-kah",
    "unit": null,
    "example": "Tavka.",
    "hint": "tavka means give."
  },
  {
    "id": "loumka",
    "en": "take",
    "category": "verb",
    "pron": "LOOM-kah",
    "unit": null,
    "example": "Loumka.",
    "hint": "loumka means take."
  },
  {
    "id": "kouni",
    "en": "open",
    "category": "verb",
    "pron": "KOO-nee",
    "unit": null,
    "example": "Kouni.",
    "hint": "kouni means open."
  },
  {
    "id": "darka",
    "en": "close",
    "category": "verb",
    "pron": "DAR-kah",
    "unit": null,
    "example": "Darka.",
    "hint": "darka means close."
  },
  {
    "id": "vouta",
    "en": "start",
    "category": "verb",
    "pron": "VOO-tah",
    "unit": null,
    "example": "Vouta.",
    "hint": "vouta means start."
  },
  {
    "id": "valaka",
    "en": "finish",
    "category": "verb",
    "pron": "vah-LAH-kah",
    "unit": null,
    "example": "Valaka.",
    "hint": "valaka means finish."
  },
  {
    "id": "brinkou",
    "en": "build",
    "category": "verb",
    "pron": "brin-KOO",
    "unit": null,
    "example": "Brinkou.",
    "hint": "brinkou means build."
  },
  {
    "id": "pankou",
    "en": "break",
    "category": "verb",
    "pron": "pan-KOO",
    "unit": null,
    "example": "Pankou.",
    "hint": "pankou means break."
  },
  {
    "id": "norku",
    "en": "fix",
    "category": "verb",
    "pron": "NOR-koo",
    "unit": null,
    "example": "Norku.",
    "hint": "norku means fix."
  },
  {
    "id": "vranka",
    "en": "change",
    "category": "verb",
    "pron": "VRAHN-kah",
    "unit": null,
    "example": "Vranka.",
    "hint": "vranka means change."
  },
  {
    "id": "meknou",
    "en": "new",
    "category": "adjective",
    "pron": "mek-NOO",
    "unit": null,
    "example": "Meknou.",
    "hint": "meknou means new."
  },
  {
    "id": "lourka",
    "en": "old",
    "category": "adjective",
    "pron": "LOOR-kah",
    "unit": null,
    "example": "Lourka.",
    "hint": "lourka means old."
  },
  {
    "id": "prita",
    "en": "easy",
    "category": "adjective",
    "pron": "PREE-tah",
    "unit": null,
    "example": "Prita.",
    "hint": "prita means easy."
  },
  {
    "id": "drakka",
    "en": "hard",
    "category": "adjective",
    "pron": "DRAH-kuh",
    "unit": null,
    "example": "Drakka.",
    "hint": "drakka means hard."
  },
  {
    "id": "voutou",
    "en": "fast",
    "category": "adjective",
    "pron": "voo-TOO",
    "unit": null,
    "example": "Voutou.",
    "hint": "voutou means fast."
  },
  {
    "id": "nouti",
    "en": "slow",
    "category": "adjective",
    "pron": "NOO-tee",
    "unit": null,
    "example": "Nouti.",
    "hint": "nouti means slow."
  },
  {
    "id": "lekra",
    "en": "bright",
    "category": "adjective",
    "pron": "LEH-krah",
    "unit": null,
    "example": "Lekra.",
    "hint": "lekra means bright."
  },
  {
    "id": "nourek",
    "en": "dark",
    "category": "adjective",
    "pron": "NOO-rek",
    "unit": null,
    "example": "Nourek.",
    "hint": "nourek means dark."
  },
  {
    "id": "varka",
    "en": "warm",
    "category": "adjective",
    "pron": "VAR-kah",
    "unit": null,
    "example": "Varka.",
    "hint": "varka means warm."
  },
  {
    "id": "krihka",
    "en": "cold",
    "category": "adjective",
    "pron": "KREE-kah",
    "unit": null,
    "example": "Krihka.",
    "hint": "krihka means cold."
  },
  {
    "id": "laela",
    "en": "quiet",
    "category": "adjective",
    "pron": "LAY-lah",
    "unit": null,
    "example": "Laela.",
    "hint": "laela means quiet."
  },
  {
    "id": "doumka",
    "en": "loud",
    "category": "adjective",
    "pron": "DOOM-kah",
    "unit": null,
    "example": "Doumka.",
    "hint": "doumka means loud."
  },
  {
    "id": "reakou",
    "en": "ready",
    "category": "adjective",
    "pron": "ree-AH-koo",
    "unit": null,
    "example": "Reakou.",
    "hint": "reakou means ready."
  },
  {
    "id": "pranka",
    "en": "safe",
    "category": "adjective",
    "pron": "PRAHN-kah",
    "unit": null,
    "example": "Pranka.",
    "hint": "pranka means safe."
  },
  {
    "id": "douluh",
    "en": "kind",
    "category": "adjective",
    "pron": "DOO-luh",
    "unit": null,
    "example": "Douluh.",
    "hint": "douluh means kind."
  },
  {
    "id": "sarik",
    "en": "honest",
    "category": "adjective",
    "pron": "SAH-rik",
    "unit": null,
    "example": "Sarik.",
    "hint": "sarik means honest."
  },
  {
    "id": "kintou",
    "en": "curious",
    "category": "adjective",
    "pron": "kin-TOO",
    "unit": null,
    "example": "Kintou.",
    "hint": "kintou means curious."
  },
  {
    "id": "veekan",
    "en": "clever",
    "category": "adjective",
    "pron": "VEE-kan",
    "unit": null,
    "example": "Veekan.",
    "hint": "veekan means clever."
  },
  {
    "id": "bounka",
    "en": "funny",
    "category": "adjective",
    "pron": "BOON-kah",
    "unit": null,
    "example": "Bounka.",
    "hint": "bounka means funny."
  },
  {
    "id": "maeka",
    "en": "family",
    "category": "noun",
    "pron": "MAY-kah",
    "unit": null,
    "example": "Maeka.",
    "hint": "maeka means family."
  },
  {
    "id": "shikra",
    "en": "sibling",
    "category": "noun",
    "pron": "SHIK-rah",
    "unit": null,
    "example": "Shikra.",
    "hint": "shikra means sibling."
  },
  {
    "id": "doura",
    "en": "parent",
    "category": "noun",
    "pron": "DOO-rah",
    "unit": null,
    "example": "Doura.",
    "hint": "doura means parent."
  },
  {
    "id": "nela",
    "en": "child",
    "category": "noun",
    "pron": "NEH-lah",
    "unit": null,
    "example": "Nela.",
    "hint": "nela means child."
  },
  {
    "id": "vorka",
    "en": "teacher",
    "category": "noun",
    "pron": "VOR-kah",
    "unit": null,
    "example": "Vorka.",
    "hint": "vorka means teacher."
  },
  {
    "id": "leekou",
    "en": "student",
    "category": "noun",
    "pron": "lee-KOO",
    "unit": null,
    "example": "Leekou.",
    "hint": "leekou means student."
  },
  {
    "id": "minka",
    "en": "person",
    "category": "noun",
    "pron": "MIN-kah",
    "unit": null,
    "example": "Minka.",
    "hint": "minka means person."
  },
  {
    "id": "drana",
    "en": "people",
    "category": "noun",
    "pron": "DRAH-nah",
    "unit": null,
    "example": "Drana.",
    "hint": "drana means people."
  },
  {
    "id": "vnou",
    "en": "one",
    "category": "number",
    "pron": "VNOO",
    "unit": null,
    "example": "Vnou.",
    "hint": "vnou means one."
  },
  {
    "id": "douka",
    "en": "two",
    "category": "number",
    "pron": "DOO-kah",
    "unit": null,
    "example": "Douka.",
    "hint": "douka means two."
  },
  {
    "id": "treeka",
    "en": "three",
    "category": "number",
    "pron": "TREE-kah",
    "unit": null,
    "example": "Treeka.",
    "hint": "treeka means three."
  },
  {
    "id": "forka",
    "en": "four",
    "category": "number",
    "pron": "FOR-kah",
    "unit": null,
    "example": "Forka.",
    "hint": "forka means four."
  },
  {
    "id": "penta",
    "en": "five",
    "category": "number",
    "pron": "PEN-tah",
    "unit": null,
    "example": "Penta.",
    "hint": "penta means five."
  }
];
const DARBENESE_PHRASES=[
  {
    "dar": "kushu macka lacka",
    "en": "together we stand strong",
    "pron": "KUH-shoo MAH-kuh LAH-kuh",
    "description": "A Darbenese motto about unity and supporting each other."
  },
  {
    "dar": "sava kelo",
    "en": "hello friend",
    "pron": "SAH-vah KEH-loh"
  },
  {
    "dar": "naro kelo",
    "en": "goodbye friend",
    "pron": "NAH-roh KEH-loh"
  },
  {
    "dar": "dbwuh kelo",
    "en": "thank you friend",
    "pron": "duh-BWUH KEH-loh"
  },
  {
    "dar": "wi rava donaek",
    "en": "we go tomorrow",
    "pron": "WEE RAH-vah doh-NAYK"
  },
  {
    "dar": "mi saki vexa",
    "en": "i like games",
    "pron": "MEE SAH-kee VEH-ksah"
  },
  {
    "dar": "tu nemi zani",
    "en": "you want food",
    "pron": "TOO NEH-mee ZAH-nee"
  },
  {
    "dar": "mi vora zani",
    "en": "i have food",
    "pron": "MEE VOH-rah ZAH-nee"
  },
  {
    "dar": "wi rava",
    "en": "we go",
    "pron": "WEE RAH-vah"
  }
];
const DARBENESE_PRON_OVERRIDES={
  "sava": "SAH-vah",
  "naro": "NAH-roh",
  "kelo": "KEH-loh",
  "vexa": "VEH-ksah",
  "zani": "ZAH-nee",
  "baga": "BAH-gah",
  "mi": "MEE",
  "tu": "TOO",
  "la": "LAH",
  "wi": "WEE",
  "saki": "SAH-kee",
  "nemi": "NEH-mee",
  "dumo": "DOO-moh",
  "mira": "MEE-rah",
  "luma": "LOO-mah",
  "sora": "SOH-rah",
  "torga": "TOR-gah",
  "moro": "MOH-roh",
  "jarob": "JAH-rob",
  "liti": "LEE-tee",
  "nika": "NEE-kah",
  "vora": "VOH-rah",
  "nava": "NAH-vah",
  "rava": "RAH-vah",
  "meka": "MEH-kah"
};
function darbenesePronunciation(word){
 if(DARBENESE_PRON_OVERRIDES[word?.id])return DARBENESE_PRON_OVERRIDES[word.id];
 if(word?.pron)return word.pron;
 return String(word?.id||"").toLowerCase().replace(/ou/g,"OO").replace(/ee/g,"EE").replace(/ae/g,"AY")
   .replace(/sh/g,"SH").replace(/ch/g,"CH").replace(/a/g,"ah")
   .replace(/e/g,"eh").replace(/i/g,"ee").replace(/o/g,"oh")
   .replace(/u/g,"uh").toUpperCase();
}
