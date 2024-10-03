import { getDailyWord } from "get-daily-word";
import { create } from "zustand";

interface GameStore {
  word: string;
  guesses: string[];
  currentGuess: number;
  won: boolean;
  lost: boolean;
  exactGuesses: string[];
  inexactGuesses: string[];
  startGame: () => void;
  inputLetter: (letter: string) => void;
  deleteLetter: () => void;
  submitGuess: () => void;
}

export const useWordleStore = create<GameStore>((set, get) => ({
  word: "",
  guesses: new Array(6).fill(""),
  currentGuess: 0,
  won: false,
  lost: false,

  get exactGuesses() {
    const { word, guesses, currentGuess } = get();
    return word.split("").filter((letter, i) =>
      guesses
        .slice(0, currentGuess)
        .map((guess) => guess[i])
        .includes(letter)
    );
  },
  get inexactGuesses() {
    const { word, guesses } = get();
    const allGuesses = guesses.slice(0, get().currentGuess).join("").split("");
    return word.split("").filter((letter) => allGuesses.includes(letter));
  },

  startGame: async () => {
    const newWord = getDailyWord();
    set(() => ({
      word: newWord,
      guesses: new Array(6).fill(""),
      currentGuess: 0,
      won: false,
      lost: false,
    }));
  },

  inputLetter: (letter: string) => {
    const { currentGuess, guesses, won, lost } = get();
    if (won || lost) return;

    const currentWord = guesses[currentGuess];
    if (currentWord.length < 5) {
      const updatedGuesses = [...guesses];
      updatedGuesses[currentGuess] = currentWord + letter.toLowerCase();
      set(() => ({ guesses: updatedGuesses }));
    }
  },

  deleteLetter: () => {
    const { currentGuess, guesses, won, lost } = get();
    if (won || lost) return;

    const currentWord = guesses[currentGuess];
    if (currentWord.length > 0) {
      const updatedGuesses = [...guesses];
      updatedGuesses[currentGuess] = currentWord.slice(0, -1);
      set(() => ({ guesses: updatedGuesses }));
    }
  },

  submitGuess: () => {
    const { word, guesses, currentGuess, won, lost } = get();
    if (won || lost) return;

    const currentWord = guesses[currentGuess];

    if (currentWord.length === 5) {
      if (currentWord === word) {
        set(() => ({ won: true }));
      } else if (currentGuess === 5) {
        set(() => ({ lost: true }));
      } else {
        const nextGuess = currentGuess + 1;
        set(() => ({ currentGuess: nextGuess }));
      }
    }
  },
}));
