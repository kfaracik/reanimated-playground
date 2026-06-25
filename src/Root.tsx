import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./app/index";

const APP_BACKGROUND = "#0c0f1d";

export default function Root() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(APP_BACKGROUND);
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: APP_BACKGROUND }}>
        <HomeScreen />
      </View>
    </SafeAreaProvider>
  );
}
