import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../i18n";
import MainMenu from "../scenes/main-menu/MainMenu";
import PhysicsAnimationsScene from "../scenes/physics-animations/PhysicsAnimationsScene";
import SolarSystemScene from "../scenes/solar-system/SolarSystemScene";
import SvgAnimationsScene from "../scenes/svg-animations/SvgAnimationsScene";

type Screen = "menu" | "solar-system" | "svg-animations" | "physics-animations";

export default function HomeScreen() {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<Screen>("menu");

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <SafeAreaView style={styles.safeArea}>
        {screen === "menu" && (
          <MainMenu
            t={t}
            onOpenSolarSystem={() => setScreen("solar-system")}
            onOpenSvgAnimations={() => setScreen("svg-animations")}
            onOpenPhysicsAnimations={() => setScreen("physics-animations")}
          />
        )}
        {screen === "solar-system" && (
          <SolarSystemScene t={t} onBack={() => setScreen("menu")} />
        )}
        {screen === "svg-animations" && (
          <SvgAnimationsScene t={t} onBack={() => setScreen("menu")} />
        )}
        {screen === "physics-animations" && (
          <PhysicsAnimationsScene t={t} onBack={() => setScreen("menu")} />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0c0f1d",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
