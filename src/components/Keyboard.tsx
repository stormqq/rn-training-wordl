import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "tamagui";
import { useWordleStore } from "../store/gameStore";

const qwerty = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

const Keyboard = () => {
  const state = useWordleStore();
  const [keyStatus, setKeyStatus] = useState<Record<string, string>>({});

  useEffect(() => {
    if (state.currentGuess > 0) {
      const lastGuess = state.guesses[state.currentGuess - 1];
      const newKeyStatus = { ...keyStatus };

      lastGuess.split("").forEach((letter, index) => {
        if (letter === state.word[index]) {
          newKeyStatus[letter] = "correct";
        } else if (state.word.includes(letter)) {
          newKeyStatus[letter] = "present";
        } else {
          if (!newKeyStatus[letter]) {
            newKeyStatus[letter] = "used";
          }
        }
      });

      setKeyStatus(newKeyStatus);
    }
  }, [state.currentGuess, state.guesses, state.word]);

  const handleKeyPress = (key: string) => {
    state.inputLetter(key);
  };

  const handleBackspace = () => {
    state.deleteLetter();
  };

  const handleEnter = () => {
    state.submitGuess();
  };

  useEffect(() => {
    if (state.won || state.lost) {
      state.startGame();
      setKeyStatus({});
    }
  }, [state.won, state.lost]);

  return (
    <View style={styles.keyboard}>
      {qwerty.slice(0, 2).map((row, rowIndex) => (
        <View key={rowIndex} style={styles.keyboardRow}>
          {row.split("").map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => handleKeyPress(key)}
              style={[
                styles.key,
                {
                  backgroundColor:
                    keyStatus[key] === "correct"
                      ? "#28a745"
                      : keyStatus[key] === "present"
                      ? "orange"
                      : keyStatus[key] === "used"
                      ? "#2e2e2e"
                      : "#c4c2c2",
                },
              ]}
            >
              <Text style={styles.keyText}>{key.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <View style={styles.keyboardRow}>
        <TouchableOpacity onPress={handleBackspace} style={styles.controlKey}>
          <Text style={styles.controlKeyText}>CLEAR</Text>
        </TouchableOpacity>
        {qwerty[2].split("").map((key) => (
          <TouchableOpacity
            key={key}
            onPress={() => handleKeyPress(key)}
            style={[
              styles.key,
              {
                backgroundColor:
                  keyStatus[key] === "correct"
                    ? "#28a745"
                    : keyStatus[key] === "present"
                    ? "orange"
                    : keyStatus[key] === "used"
                    ? "#2e2e2e"
                    : "#c4c2c2",
              },
            ]}
          >
            <Text style={styles.keyText}>{key.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={handleEnter} style={styles.controlKey}>
          <Text style={styles.controlKeyText}>ENTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Keyboard;

const styles = StyleSheet.create({
  keyboard: {
    marginTop: 20,
    margin: 30,
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  key: {
    padding: 8,
    margin: 5,
    borderRadius: 5,
    minWidth: 20,
  },
  keyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  controlKey: {
    padding: 10,
    width: 65,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    backgroundColor: "#c4c2c2",
    borderRadius: 5,
  },
  controlKeyText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});
