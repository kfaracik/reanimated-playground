import React, { memo } from "react";
import { StyleSheet } from "react-native";
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";

const EMOJIS = ["👑", "🔥", "🥳", "😎", "👏", "🏆"];

type BlastParticleProps = {
  index: number;
  progress: SharedValue<number>;
};

export const BlastParticle = memo(function BlastParticle({
  index,
  progress,
}: BlastParticleProps) {
  const angle = (index * 137.5 * Math.PI) / 180;
  const radius = 60 + ((index * 7) % 160);
  const endX = Math.cos(angle) * radius;
  const endY = Math.sin(angle) * radius;
  const targetRotation = ((index * 43) % 240) - 120;
  const emoji = EMOJIS[index % EMOJIS.length];

  const animatedStyle = useAnimatedStyle(() => {
    const p = progress.get();
    const currentScale = 0.1 + p * 1.5;
    const currentOpacity = p < 0.5 ? 1 : 1 - (p - 0.5) / 0.5;

    return {
      transform: [
        { translateX: endX * p },
        { translateY: endY * p },
        { scale: currentScale },
        { rotate: `${targetRotation * p}deg` },
      ],
      opacity: currentOpacity,
    };
  });

  return (
    <Animated.Text style={[styles.particle, animatedStyle]}>
      {emoji}
    </Animated.Text>
  );
});

const styles = StyleSheet.create({
  particle: {
    position: "absolute",
    fontSize: 28,
  },
});
