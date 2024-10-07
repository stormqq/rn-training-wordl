import {
  Button,
  Image,
  Separator,
  SizableText,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";
import { useCallback, useEffect, useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import { useWordleStore } from "@/src/store/gameStore";
import LetterRow from "@/src/components/Letter";
import Keyboard from "@/src/components/Keyboard";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import { BottomSheet } from "@/src/components/Sheet";
import { Share } from "react-native";

const Game = () => {
  const state = useWordleStore();
  const navigation = useNavigation();
  const [isSettingsSheetOpen, setIsSettingsSheetOpen] = useState(false);
  const [isWinSheetOpen, setIsWinSheetOpen] = useState(false);

  useEffect(() => {
    if (!state.word) {
      state.startGame();
    }
  }, []);

  useEffect(() => {
    if (state.won) {
      Alert.alert("You won!");
      setIsWinSheetOpen(true);
      state.startGame();
    } else if (state.lost) {
      Alert.alert("You lost!");
      state.startGame();
    }
  }, [state.won, state.lost]);

  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleOpenSettings = useCallback(() => {
    setIsSettingsSheetOpen(true);
  }, []);

  const shareText = async () => {
    try {
      await Share.share({
        message: `I just played Wordle and I won! ${state.word}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <YStack justifyContent="center" alignItems="center">
        <XStack
          gap="$3"
          alignItems="center"
          justifyContent="space-between"
          padding="$3"
          width={"100%"}
        >
          <XStack gap="$3" alignItems="center">
            <Button
              unstyled
              icon={<AntDesign name="left" size={24} color="black" />}
              onPress={handleNavigateBack}
            />
            <Text fontWeight={"bold"} fontSize="$8">
              Wordle
            </Text>
          </XStack>
          <Button
            unstyled
            icon={<Ionicons name="settings" size={24} color="black" />}
            onPress={handleOpenSettings}
          />
        </XStack>

        {state.guesses.map((_, index) => (
          <LetterRow
            word={state.word}
            guess={state.guesses[index]}
            isGuessed={index < state.currentGuess}
            key={index}
          />
        ))}
        <Keyboard />
      </YStack>
      <BottomSheet
        isOpen={isSettingsSheetOpen}
        onDismiss={() => setIsSettingsSheetOpen(false)}
      >
        <YStack justifyContent="center" alignItems="center" gap="$8">
          <SizableText size="$8">Settings</SizableText>
          <Button
            fontSize={"$5"}
            borderWidth={1}
            borderColor={"$gray11"}
            backgroundColor={"$gray2"}
            onPress={() => state.startGame()}
          >
            Generate random word
          </Button>
        </YStack>
      </BottomSheet>

      <BottomSheet
        isOpen={isWinSheetOpen}
        onDismiss={() => setIsWinSheetOpen(false)}
        points={100}
      >
        <YStack flex={1} justifyContent="center" alignItems="center" gap="$4">
          <Button
            unstyled
            alignSelf="flex-end"
            iconAfter={<AntDesign name="close" size={24} color="black" />}
            onPress={() => setIsWinSheetOpen(false)}
          />
          <Image
            source={{
              uri: "https://i.ibb.co/4YNd4Hr/win.png",
            }}
            width={100}
            height={100}
          />
          <SizableText size="$9">
            <Text fontWeight={"bold"}>Congratulations!</Text>
          </SizableText>
          <SizableText size="$8">
            <Text fontWeight={"bold"}>Statistics</Text>
          </SizableText>
          <XStack gap="$8">
            <YStack alignItems="center" gap="$0.5">
              <Text fontSize={"$7"} fontWeight={"bold"}>
                {state.totalGames}
              </Text>
              <Text fontSize={"$6"}>Played</Text>
            </YStack>
            <YStack alignItems="center" gap="$0.5">
              <Text fontSize={"$7"} fontWeight={"bold"}>
                {state.totalWins}
              </Text>
              <Text fontSize={"$6"}>Wins</Text>
            </YStack>
            <YStack alignItems="center" gap="$0.5">
              <Text fontSize={"$7"} fontWeight={"bold"}>
                {state.currentStreak}
              </Text>
              <Text fontSize={"$6"}>Streak</Text>
            </YStack>
          </XStack>
          <Separator
            width={"100%"}
            borderBottomWidth="$1"
            borderBottomColor={"$gray7"}
          />
          <Button
            width={"60%"}
            borderRadius={"$10"}
            fontSize={"$5"}
            fontWeight={"bold"}
            color={"white"}
            iconAfter={<AntDesign name="sharealt" size={24} color="white" />}
            backgroundColor={"#2f8f49"}
            onPress={shareText}
          >
            Share
          </Button>
        </YStack>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Game;
