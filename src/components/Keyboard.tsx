import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "tamagui";
import { useWordleStore } from "../store/gameStore";

const Keyboard = () => {
  const qwerty = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
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
          newKeyStatus[letter] = "absent";
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

  const handleRefreshGame = () => {
    state.startGame();
    setKeyStatus({});
  };

  return (
    <View style={styles.keyboard}>
      {qwerty.map((row, rowIndex) => (
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
                      : "#ddd",
                },
              ]}
            >
              <Text style={styles.keyText}>{key.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <View style={styles.keyboardRow}>
        <TouchableOpacity onPress={handleBackspace} style={styles.key}>
          <Text style={styles.keyText}>CLEAR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRefreshGame} style={styles.key}>
          <Text style={styles.keyText}>REFRESH</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEnter} style={styles.keyEnter}>
          <Text style={styles.keyText}>Enter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Keyboard;

const styles = StyleSheet.create({
  keyboard: {
    marginTop: 20,
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  key: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  keyText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  keyEnter: {
    padding: 10,
    margin: 5,
    backgroundColor: "#28a745",
    borderRadius: 5,
  },
});
