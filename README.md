# Darbenese Language Learner

A free, browser-based, Duolingo-inspired way to learn **Darbenese**, an original fictional language.

**[Launch the Darbenese Language Learner](https://darby9123-arch.github.io/Darbenese-Langauge-Learner/)**

## More Duolingo-inspired features (latest update)

- **Daily quests:** Earn 50 XP, get five answers right, and finish a lesson/review. Claim free gems when each quest is done. Quests reset each local calendar day.
- **Achievements:** Unlock six badges for words discovered, lessons finished, reviews, correct answers and learning streaks. Earn free gems automatically when milestones are met.
- **Gem shop:** Spend earned gems on one heart, a full heart refill or packs of three optional hints. **No real-money purchases.**
- **Persistent hearts:** Five hearts shared across course lessons; wrong answers use hearts. One heart regenerates every 20 minutes (checked on your next interaction). Finishing any review restores one, even if you're at zero.
- **Daily XP goals:** Pick 20, 50 or 100 XP per day.
- **Topic practice:** Review words from a specific unit instead of only using the automatic smart-review queue.
- **Dictionary search:** Quickly find a learned Darbenese word or its English meaning.
- **Profile icons:** Choose a free profile symbol for your app header.
- **Activity history:** A seven-day learning calendar shows the days when you finished a lesson or review.

All rewards and progress are saved on this browser only. The course continues to use its curated 25-word Darbenese vocabulary.

## Smarter, natural English translation

- **English synonyms and greetings:** hi, hey, hello, howdy, greetings, and good morning can all become the established Darbenese greeting **sava**.
- **Common alternatives:** buddy / mate / friend, thanks / thank you, happy / joyful, huge / enormous, and many more everyday variations map to the closest defined Darbenese vocabulary.
- **Phrase-aware translation:** handles selected equivalent full expressions, such as different ways of saying "together we stand strong" or simple subject-and-adjective sentences.
- **Plurals and verb forms:** common forms like friends, making, loved, and went can use an existing base translation.
- **Capitalization and punctuation:** HI! → SAVA!, Hi! → Sava!, and proper-name-style phrase capitalization is preserved in both directions.
- The **English input remains unchanged**. The translation result displays naturally, without unnecessary transformation labels.
- **Unknown terms are never invented:** if a reliable equivalent is unavailable, unsupported text stays visible and is marked as unmapped so the translation cannot silently change its meaning.
- Implementation is fully browser-based in translation-upgrade.js with no remote translation service or API key.

## Darbenese Atlas — complete redesign

Open the live site: https://darby9123-arch.github.io/Darbenese-Langauge-Learner/

This update completely replaces the old green Duolingo-style appearance with a dark Atlas workspace, editorial display typography, desktop sidebar, and responsive mobile navigation.

- **170-word complete dictionary:** every word defined in the project is available from day one. Search Darbenese, English meanings or pronunciation cues and filter by word class. "Studied" status is shown separately from whether a word is visible.
- **16 user-specified words:** kushu, macka, lacka, pnuh, dbwuh, reakles, nintouh, lackbunth, doutch, coutavuh, pluh, veedict, kneecadn, duh, shmwah and donaek, plus dozens of similar original words. The earlier **jarob = fat** remains available.
- **Kushu macka lacka** means **"Together we stand strong"**, a unity motto. Kushu = together; macka = stand; lacka = strong.
- **Pronunciation on dictionary cards, teaching cards, and answer feedback.** Darbenese "ou" consistently makes the "oo" sound, as in moon. Suggested written pronunciations are creative conventions for this project, not recordings of fluent native speakers.
- **Two-way translator:** English ⇄ Darbenese, supports defined words, several complete phrases, punctuation and word-by-word breakdown. Unknown words stay unchanged and are clearly flagged rather than guessed. This is a vocabulary- and phrase-based translator, not a general grammar engine.
- **Eight course chapters** teaching 49 core vocabulary entries. The remaining 121 supplementary words are still searchable and translatable.
- **Guided lessons:** default beginner mode covers three new words at a time with short sessions. Standard mode still supports complete longer lessons. Chapters unlock only after the words in that chapter have been introduced.
- Existing experience points, saved word mastery, achievements, streaks, gems and learned words stay in local storage.

**Meaning note:** Darbenese is a fictional language developed within this project. The newly added English meanings and pronunciations are proposed vocabulary assignments that can be revised by its creator.

## What's new

### Reinforced vocabulary and better mistake explanations
- The vocabulary now includes **jarob = fat** (a descriptive adjective), in Unit 3.
- **Every missed vocabulary answer** clearly shows the Darbenese word, its English meaning, a short example and a memory hint. Correct answers also show a quick meaning reminder.
- **Wrong matching pairs** immediately reveal the translation, with an example. Sentence questions display a word-by-word meaning breakdown.
- **Spiral learning across different lessons:** up to four previously introduced words are revisited in every course lesson, even when spaced repetition does not mark them due.
- Earlier words receive a **reminder teaching card before the exercises**, then show up in quiz questions. Words missed previously are prioritised, while other words rotate in over time. Replaying unlocked lessons also reinforces vocabulary from other units.

### Personalised learning
- **Four genuinely different course units** with 25 curated Darbenese words and progressively more challenging skills.
- **Smart review:** words that are due for recall come back automatically. If nothing is due, you can practise words you previously missed.
- **Learn from mistakes:** every word remembers how often you got it right or wrong. Missed questions get an explanation and another chance later in the same session.
- **Spaced repetition:** correctly recalled words are scheduled for review after increasing intervals (approximately 1, 3, 7, 14, 30 and 60 days). A miss brings the word back sooner.
- **Mastery levels** are tracked per word rather than just showing a total XP number.

### More interesting lessons
- Multiple-choice questions in both translation directions
- Typed Darbenese answers (case and punctuation tolerant)
- Tap-to-build sentence exercises, with undo
- Interactive matching pairs
- Word introduction cards with example sentences and hints
- Immediate answer feedback, including the answer and a relevant learning tip
- Extra practice for missed items before each lesson ends

### Your progress
- Unlock units as you complete lessons
- Today's XP goal, total XP, discovered words, accuracy and mastery
- Proper daily streaks (only one streak day per calendar day)
- Dedicated **Review**, **Words** and **Progress** tabs
- Course and practice history stored in your browser

## How to use

1. Open the live app and start **First Words**.
2. Study each new word, then answer questions to practise it. You can skip introductory cards if you prefer.
3. Mistakes are explained and questions return for an extra attempt.
4. Finish a unit to unlock the next one.
5. Return to **Review** regularly to refresh words before you forget them.

**Note:** Darbenese is a fictional language. Words and example phrases in the app are part of the project's own vocabulary, not an established real-world language standard.

## Saving and privacy

The app uses browser local storage on your device. It **does not** require an account, connect to a server or transmit your answers. Progress is tied to that browser and can be lost if browser storage is cleared. Existing first-version XP and discovered words are imported where available. The previous version's streak was not a true calendar streak, so that unreliable figure isn't imported.

## Tech

Plain HTML, CSS and JavaScript (language-data.js, script.js, gameplus.js, and dictionary.js), hosted on GitHub Pages. No build tools, external libraries, server or API key required.

To run locally, open the index.html file in a modern browser.

## Future possibilities

- Additional curated Darbenese vocabulary and sentence structures
- Audio recorded by the language creator (for accurate fictional-language pronunciation)
- Optional cloud sync across devices
- More grammar-focused exercises and achievements
