import { SizableText, Text, View } from "tamagui";
import LetterRow from "./Letter";
import { useEffect } from "react";
import { useWordleStore } from "../store/gameStore";
import Keyboard from "./Keyboard";

const Game = () => {
  const state = useWordleStore();

  useEffect(() => {
    state.startGame();
  }, []);

  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <SizableText marginBottom="$2" size="$8">Daily word: {state.word}</SizableText>
      {state.guesses.map((_, index) => (
        <LetterRow
          word={state.word}
          guess={state.guesses[index]}
          isGuessed={index < state.currentGuess}
          key={index}
        />
      ))}
      <SizableText marginTop="$2" size="$8">Current guess: {state.currentGuess}</SizableText>
      <Keyboard />
    </View>
  );
};

export default Game;
