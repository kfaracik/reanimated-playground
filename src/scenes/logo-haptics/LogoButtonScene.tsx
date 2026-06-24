import React, { useCallback, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import SceneScreen from "../../app/shared/SceneScreen";
import { LogoParticle, ParticleData } from "./componentes/LogoParticle";

type TranslationFunction = (key: string) => string;

const EMOJI_POOL = ["😀", "😡", "🥳", "😎", "😢", "😱", "😈", "🤡"];

let particleIdCounter = 0;

export const LogoButton = ({
  t,
  onBack,
}: {
  t: TranslationFunction;
  onBack: () => void;
}) => {
  const [particles, setParticles] = useState<ParticleData[]>([]);
  const logoScale = useSharedValue(1);

  const removeParticle = useCallback((id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handlePressIn = useCallback(() => {
    logoScale.set(withTiming(0.85, { duration: 70 }));
  }, [logoScale]);

  const handlePressOut = useCallback(() => {
    logoScale.set(withSpring(1, { damping: 5, stiffness: 280 }));
  }, [logoScale]);

  const handlePress = useCallback(() => {
    Vibration.vibrate(8);

    const count = Math.floor(Math.random() * 7) + 1;
    const newParticles: ParticleData[] = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 100 + Math.random() * 80;

      newParticles.push({
        id: particleIdCounter++,
        endX: Math.cos(angle) * radius,
        endY: Math.sin(angle) * radius,
        rotation: (Math.random() - 0.5) * 140,
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.get() }],
  }));

  return (
    <SceneScreen
      title={t("logoButton.title")}
      onBack={onBack}
      framed={false}
      contentCentered
    >
      <View style={styles.buttonWrapper}>
        <View style={styles.particleContainer}>
          {particles.map((particleData) => (
            <LogoParticle
              key={particleData.id}
              emoji={EMOJI_POOL[particleData.id % EMOJI_POOL.length]}
              data={particleData}
              onComplete={removeParticle}
            />
          ))}
        </View>

        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          style={styles.button}
        >
          <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
            <Image
              source={require("../../../assets/images/logo/logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.clickMeText}>CLICK ME →</Text>
          </Animated.View>
        </Pressable>
      </View>
    </SceneScreen>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  particleContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
    zIndex: 1,
  },
  button: {
    zIndex: 5,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  clickMeText: {
    color: "#FAFAFA",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 2,
    marginTop: 20,
    opacity: 0.6,
  },
});
