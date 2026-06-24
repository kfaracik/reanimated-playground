import React, { memo, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from "react-native-reanimated";

export type ParticleData = {
  id: number;
  endX: number;
  endY: number;
  rotation: number;
};

type LogoParticleProps = {
  emoji: string;
  data: ParticleData;
  onComplete: (id: number) => void;
};

export const LogoParticle = memo(function LogoParticle({
  emoji,
  data,
  onComplete,
}: LogoParticleProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0.1);
  const opacity = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    scale.set(withTiming(1, { duration: 400 }));
    rotate.set(withTiming(data.rotation, { duration: 700 }));
    translateX.set(withTiming(data.endX, { duration: 700 }));
    translateY.set(withTiming(data.endY, { duration: 700 }));
    opacity.set(
      withSequence(
        withTiming(1, { duration: 500 }),
        withTiming(0, { duration: 200 }, (finished) => {
          if (finished) {
            runOnJS(onComplete)(data.id);
          }
        }),
      ),
    );
  }, [
    data.endX,
    data.endY,
    data.id,
    data.rotation,
    onComplete,
    opacity,
    rotate,
    scale,
    translateX,
    translateY,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.get() },
      { translateY: translateY.get() },
      { scale: scale.get() },
      { rotate: `${rotate.get()}deg` },
    ],
    opacity: opacity.get(),
  }));

  return (
    <Animated.Text style={[styles.particleText, animatedStyle]}>
      {emoji}
    </Animated.Text>
  );
});

const styles = StyleSheet.create({
  particleText: {
    fontSize: 28,
    position: "absolute",
    zIndex: 2,
    textAlign: "center",
  },
});
