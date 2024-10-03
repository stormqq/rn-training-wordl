import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";

type CardProps = {
  word: string;
  guess: string;
  isGuessed: boolean;
  index: number;
  flip: any;
};

const duration = 500;

const Card = ({
  word,
  guess,
  isGuessed,
  index,
  flip,
}: CardProps & { index: number }) => {
  const flipProgress = useSharedValue(0);

  const bgColor = !isGuessed
    ? "gray"
    : guess[index] === word[index]
    ? "green"
    : word.includes(guess[index])
    ? "orange"
    : "gray";

  useEffect(() => {
    if (flip) {
      flipProgress.value = withTiming(1, { duration });
    }
  }, [flip]);

  useEffect(() => {
    flipProgress.value = 0;
  }, [word]);

  const frontCardAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipProgress.value, [0, 1], [0, 180]);

    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity: interpolate(flipProgress.value, [0, 0.5, 1], [1, 0, 0]),
    };
  });

  const backCardAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipProgress.value, [0, 1], [180, 360]);

    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity: interpolate(flipProgress.value, [0, 0.5, 1], [0, 0, 1]),
      backgroundColor: bgColor,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, frontCardAnimatedStyle]}>
        <Text style={styles.text}>{guess[index]}</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.card,
          styles.cardBack,
          { backgroundColor: bgColor },
          backCardAnimatedStyle,
        ]}
      >
        <Text style={styles.text}>{guess[index]}</Text>
      </Animated.View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    position: "relative",
  },
  card: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backfaceVisibility: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
  cardBack: {
    backgroundColor: "orange",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
});
