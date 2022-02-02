import { words } from './words';
import fetch from 'node-fetch';

// ================================================================================
/*
  1. ENTER YOUR CURRENT GUESS FOR currGuess BETWEEN ''
      ONLY ENTER LETTERS THAT ARE GREEN (KNOWN POSITION)
      ENTER * FOR ALL OTHER LETTERS, EVEN IF ORANGE
  2. ENTER ALL ORANGE LETTERS IN orangeLetters BETWEEN ''
      POSITION DOES MATTER
      ENTER * FOR NON ORANGE LETTERS (INCLUDING GREEN)
  3. ENTER ALL GREY LETTERS IN notLetters BETWEEN '' (POSITION DOES NOT MATTER)
  3. RUN tsc *.ts && node index.js
*/

let currGuess = '*o***';
let orangeLetters = 't***s';
let notLetters = 'earfund';

// ================================================================================


// Detect if there are CLI arguments, and use those if so
if (process.argv.length > 2) {
  currGuess = process.argv[2];
  orangeLetters = process.argv[3];
  notLetters = process.argv[4];
}

currGuess = currGuess.toLowerCase();
orangeLetters = orangeLetters.toLowerCase();

const processInput = (guess: string) => {
  const known: number[] = [];
  const unknown: number[] = [];

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] == '*') unknown.push(i);
    else known.push(i);
  }

  return { known, unknown };
};

const makeTruthWord = (known: number[], unknown: number[]): boolean[] => {
  let result: boolean[] = [];

  for (let i = 0; i < 5; i++) {
    if (known.indexOf(i) >= 0) result[i] = true;
    else result[i] = false;
  }

  return result;
};

const orangeToArr = (oranges: string): string[] => {
  let result = [];

  for (let i = 0; i < oranges.length; i++) {
    result.push(oranges[i]);
  }

  return result;
};

const searchWords = (
  truthWord: boolean[],
  orangeLetters: string,
  notLetters: string
): string[] => {
  let possWords: string[] = [];

  for (let i = 0; i < words.length; i++) {
    let matched: boolean = true;
    const word = words[i];

    for (let j = 0; j < 5; j++) {
      // Check if a green letter doesn't match up
      if (truthWord[j] && word[j] != currGuess[j]) {
        matched = false;
      }
    }

    // Only do further checks if necessary
    if (matched) {
      // If it has a grey letter, throw it out
      for (let l = 0; l < notLetters.length; l++) {
        if (word.indexOf(notLetters[l]) >= 0) matched = false;
      }

      if (matched) {
        // If it DOESNT have an orange letter, throw it out
        for (let k = 0; k < orangeLetters.length; k++) {
          if (orangeLetters[k] != '*' && word.indexOf(orangeLetters[k]) < 0)
            matched = false;
          else if (orangeLetters[k] != '*' && word[k] == orangeLetters[k]) {
            matched = false;
          }
        }
      }
    }

    if (matched) {
      possWords.push(word);
    }
  }

  return possWords;
};

const { known, unknown } = processInput(currGuess);
const truthWordTable = makeTruthWord(known, unknown);

const results = searchWords(truthWordTable, orangeLetters, notLetters);

console.log('Possible words, based on given info:');

for (let word of results) {
  console.log(word);
}

let map: { [key: string]: number } = {};

for (let word of results) {
  for (let i = 0; i < word.length; i++) {
    if (known.indexOf(i) >= 0) continue;

    if (map[word[i]] == undefined) map[word[i]] = 0;

    map[word[i]] = map[word[i]] + 1;
  }
}

let maxOccurIndex = 0;
let maxOccurs = 0;

for (let i = 0; i < results.length; i++) {
  // Check relative letter frequencies
  const word = results[i];
  let usedLetters: string[] = [];
  let numOccurs = 0;

  for (let j = 0; j < word.length; j++) {
    if (usedLetters.indexOf(word[j]) >= 0) continue;

    numOccurs += map[word[j]];
    usedLetters.push(word[j]);
  }

  if (numOccurs > maxOccurs) {
    maxOccurs = numOccurs;
    maxOccurIndex = i;
  }
}

// Check frequency in entire English language

type WordData = { tags: string[] }[];

const checkWordFreq = async (word: string): Promise<number> => {
  const res = await fetch(
    `https://api.datamuse.com/words?sp=${word}&md=f&max=1`
  );
  const data = (await res.json()) as WordData;

  const freq = parseFloat(data[0].tags[0].slice(2));
  return freq;
};

const checkAllResults = async () => {
  let maxFreq = 0;
  let maxFreqIndex = 0;

  for (let i = 0; i < results.length; i++) {
    const word = results[i];

    const freq = await checkWordFreq(word);

    if (freq > maxFreq) {
      maxFreq = freq;
      maxFreqIndex = i;
    }
  }

  console.log(`Most commonly used word of the results in normal English: ${results[maxFreqIndex]}`);
}


console.log(`Based on the frequencies of letters in this list of words, the word with the highest number of letter commonalities is: ${results[maxOccurIndex]}`);
console.log(maxOccurs);

if (results.length < 40) 
  checkAllResults();
