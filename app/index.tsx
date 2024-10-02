import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Card from "@/src/components/Card";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const index = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Card />
    </GestureHandlerRootView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
