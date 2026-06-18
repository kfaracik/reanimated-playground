import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

const APP_BACKGROUND = "#0c0f1d";

export default function RootLayout() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(APP_BACKGROUND);
  }, []);

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: APP_BACKGROUND },
          }}
        />
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
