import React, { useEffect, useState } from "react";
import Card from "./Card";
import { View } from "tamagui";

type LetterRowProps = {
  word: string;
  guess: string;
  isGuessed: boolean;
};

const LetterRow = ({ word, guess, isGuessed }: LetterRowProps) => {
  const [flips, setFlips] = useState<boolean[]>(new Array(5).fill(false));

  useEffect(() => {
    if (isGuessed) {
      const newFlips = new Array(5).fill(false);
      setFlips(newFlips);

      word.split("").forEach((_, index) => {
        setTimeout(() => {
          newFlips[index] = true;
          setFlips([...newFlips]);
        }, index * 300);
      });
    }
  }, [isGuessed, word]);

  return (
    <View flexDirection="row" gap="$2" marginBottom="$2">
      {new Array(5).fill(0).map((_, index) => (
        <Card
          key={index}
          word={word}
          guess={guess}
          isGuessed={isGuessed}
          index={index}
          flip={flips[index]}
        />
      ))}
    </View>
  );
};

export default LetterRow;
