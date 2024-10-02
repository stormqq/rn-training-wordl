import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const duration = 500;

const Card = () => {
  const flipProgress = useSharedValue(0);

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
    };
  });

  const handlePress = () => {
    flipProgress.value = withTiming(flipProgress.value === 0 ? 1 : 0, {
      duration,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>

        <Animated.View style={[styles.card, frontCardAnimatedStyle]}>
          <Text style={styles.text}>M</Text>
        </Animated.View>

        <Animated.View
          style={[styles.card, styles.cardBack, backCardAnimatedStyle]}
        >
          <Text style={styles.text}>S</Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
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
    fontSize: 80,
    fontWeight: "bold",
    color: "#fff",
  },
});
