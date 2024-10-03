import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createTamagui, TamaguiProvider } from "tamagui";
import { config } from "@tamagui/config/v3";
import Game from "@/src/components/Game";

const tamaguiConfig = createTamagui(config);

const index = () => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <GestureHandlerRootView>
        <Game />
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
};

export default index;
