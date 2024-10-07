import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "tamagui";

export default function Menu() {
  const router = useRouter();

  const handleStartGame = () => {
    router.push("/game");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://i.ibb.co/kHQvd4v/wordle-Logo.jpg",
        }}
        width={100}
        height={100}
      />
      <Text style={styles.title}>Wordle</Text>
      <Text style={styles.subtitle}>
        Get 6 chances to guess a 5-letter word.
      </Text>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} onPress={handleStartGame}>
          Play
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 38,
    textAlign: "center",
  },
  buttonsContainer: {
    marginTop: 22,
    gap: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    alignItems: "center",
    backgroundColor: "white",
    textAlign: "center",
    borderColor: "black",
    borderRadius: 20,
  },
});
