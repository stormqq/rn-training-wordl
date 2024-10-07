import { getDailyWord } from "get-daily-word";
import { create } from "zustand";

interface GameStore {
  word: string;
  guesses: string[];
  currentGuess: number;
  won: boolean;
  lost: boolean;
  totalGames: number;
  totalWins: number;
  currentStreak: number;
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
  totalGames: 0,
  totalWins: 0,
  currentStreak: 0,
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
    const newWord = await getDailyWord();
    set((state) => ({
      word: newWord,
      guesses: new Array(6).fill(""),
      currentGuess: 0,
      won: false,
      lost: false,
      totalGames: state.totalGames + 1,
    }));
  },

  inputLetter: (letter: string) => {
    const { currentGuess, guesses, won, lost } = get();
    if (won || lost) return;

    const currentWord = guesses[currentGuess];
    if (currentWord.length < 5) {
      const updatedGuesses = [...guesses];
      updatedGuesses[currentGuess] = currentWord + letter.toLowerCase();
      setTimeout(() => {
        set(() => ({ guesses: updatedGuesses }));
      }, 300);
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
        set((state) => ({
          won: true,
          totalWins: state.totalWins + 1,
          currentStreak: state.currentStreak + 1,
        }));
      } else if (currentGuess === 5) {
        set((state) => ({
          lost: true,
          currentStreak: 0,
        }));
      } else {
        const nextGuess = currentGuess + 1;
        set(() => ({ currentGuess: nextGuess }));
      }
    }
  },
}));
