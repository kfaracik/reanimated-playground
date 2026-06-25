import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { useChessGame } from "../hooks/useChessGame";
import { BlastParticle } from "./BlastParticle";

const PARTICLE_COUNT = 40;

export const EmojiBlast = () => {
  const { status } = useChessGame();
  const progress = useSharedValue(0);

  useEffect(() => {
    if (status === "CHECKMATE") {
      progress.set(0);
      progress.set(withTiming(1, { duration: 1200 }));
    } else {
      progress.set(0);
    }
  }, [status, progress]);

  if (status !== "CHECKMATE") {
    return null;
  }

  const particles = Array.from({ length: PARTICLE_COUNT });

  return (
    <View style={styles.container}>
      {particles.map((_, index) => (
        <BlastParticle key={index} index={index} progress={progress} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 300,
    pointerEvents: "none",
  },
});
