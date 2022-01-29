import { words } from './words';

// ================================================================================
/*
  1. ENTER YOUR CURRENT GUESS FOR currGuess BETWEEN ''
      ONLY ENTER LETTERS THAT ARE GREEN (KNOWN POSITION)
      ENTER * FOR ALL OTHER LETTERS, EVEN IF ORANGE
  2. ENTER ALL ORANGE LETTERS IN orangeLetters BETWEEN '' (POSITION DOES NOT MATTER)
  3. ENTER ALL GREY LETTERS IN notLetters BETWEEN '' (POSITION DOES NOT MATTER)
  3. RUN tsc *.ts && node index.js
*/

let currGuess = '*o*ld'
let orangeLetters = '';
let notLetters = 'fightzymesxanw';

// ================================================================================

currGuess = currGuess.toLowerCase();
orangeLetters = orangeLetters.toLowerCase();

const processInput = (guess: string) => {
  const known: number[] = [];
  const unknown: number[] = [];

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] == '*')
      unknown.push(i);
    else
      known.push(i);
  }
  
  return { known, unknown };
}

const makeTruthWord = (known: number[], unknown: number[]): boolean[] => {
  let result: boolean[] = [];

  for (let i = 0; i < 5; i++) {
    if (known.indexOf(i) >= 0)
      result[i] = true;
    else
      result[i] = false;
  }

  return result;
}

const orangeToArr = (oranges: string): string[] => {
  let result = [];

  for (let i = 0; i < oranges.length; i++) {
    result.push(oranges[i]);
  }

  return result;
}

const searchWords = (truthWord: boolean[], orangeLetters: string, notLetters: string): string[] => {
    let possWords: string[] = [];

    for (let i = 0; i < words.length; i++) {
      let matched: boolean = true;
      const word = words[i];

      for (let j = 0; j < 5; j++) {
        if (truthWord[j] && word[j] != currGuess[j]) {
          matched = false;
        }
      }

      for (let k = 0; k < orangeLetters.length; k++) {
        if (word.indexOf(orangeLetters[k]) < 0)
          matched = false;
      }

      for (let l = 0; l < notLetters.length; l++) {
        if (word.indexOf(notLetters[l]) >= 0)
          matched = false;
      }

      if (matched) {
        possWords.push(word);
      }
    }

    return possWords;
}

const { known, unknown } = processInput(currGuess);
const truthWordTable = makeTruthWord(known, unknown);

const results = searchWords(truthWordTable, orangeLetters, notLetters);


console.log('Possible words, based on given info:');

for (let word of results) {
  console.log(word);
}

// TODO: get stats about results, like the most common letters and bet words to guess based on that

// solution: create your own hashmap, using letter's char value as key and update number of occurrences (charCodeAt(i))

let map: { [key: string]: number } = {'a': 0};

for (let word of results) {
  for (let i = 0; i < word.length; i++) {
    if (unknown.indexOf(i) >= 0) {
      if (map[word[i]])
        map[word[i]]++;
      else
        map[word[i]] = 1;
    }
  }
}

let maxOccurIndex = 0;
let maxOccurs = 0;

for (let i = 0; i < results.length; i++) {
  const word = results[i];
  let numOccurs = 0;

  for (let j = 0; j < word.length; j++) {
    numOccurs += map[word[j]];
  }

  if (numOccurs > maxOccurs) {
    maxOccurIndex = numOccurs;
    maxOccurIndex = i;
  }
}

console.log(`Based on the frequencies of letters in this list of words,\n
the word with the highest number of letter commonalities is ${results[maxOccurIndex]}`);