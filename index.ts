import { words } from './words';

// ================================================================================
/*
  1. ENTER YOUR CURRENT GUESS FOR currGuess BETWEEN ''
      ONLY ENTER LETTERS THAT ARE GREEN (KNOWN POSITION)
      ENTER * FOR ALL OTHER LETTERS, EVEN IF ORANGE
  2. ENTER ALL ORANGE LETTERS IN orangeLetters BETWEEN '' (POSITION DOES NOT MATTER)
  3. RUN tsc *.ts && node index.js
*/

let currGuess = 'cake*'
let orangeLetters = 's';

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

const searchWords = (truthWord: boolean[], orangeLetters: string[]): string[] => {
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

      if (matched) {
        possWords.push(word);
      }
    }

    return possWords;
}

const { known, unknown } = processInput(currGuess);
const truthWordTable = makeTruthWord(known, unknown);
const orgLetters = orangeToArr(orangeLetters);

const results = searchWords(truthWordTable, orgLetters);


console.log('Possible words, based on given info:');

for (let word of results) {
  console.log(word);
}