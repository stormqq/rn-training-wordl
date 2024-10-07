import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createTamagui, TamaguiProvider } from "tamagui";
import { config } from "@tamagui/config/v3";

const tamaguiConfig = createTamagui(config);

export default function Layout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="game"
            options={{ title: "Wordle Game", headerShown: false }}
          />
        </Stack>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
