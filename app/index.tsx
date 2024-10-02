import { View, Text, StyleSheet } from "react-native";
import React from "react";

const index = () => {
  return (
    <View style={styles.container}>
      <Text>start page</Text>
    </View>
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
