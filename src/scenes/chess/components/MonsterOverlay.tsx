import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { GameStatus } from "../types/chess";

type MonsterOverlayProps = {
  status: GameStatus;
};

export const MonsterOverlay = ({ status }: MonsterOverlayProps) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.1);
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (status === "CHECK" || status === "CHECKMATE") {
      scale.set(0.1);
      opacity.set(0);
      translateX.set(0);

      scale.set(withSpring(2.2, { damping: 7, stiffness: 140 }));
      opacity.set(
        withSequence(
          withTiming(1, { duration: 150 }),
          withDelay(1500, withTiming(0, { duration: 250 })),
        ),
      );

      translateX.set(
        withSequence(
          withTiming(-25, { duration: 40 }),
          withTiming(25, { duration: 40 }),
          withTiming(-25, { duration: 40 }),
          withTiming(25, { duration: 40 }),
          withTiming(-20, { duration: 40 }),
          withTiming(20, { duration: 40 }),
          withTiming(-15, { duration: 40 }),
          withTiming(15, { duration: 40 }),
          withTiming(0, { duration: 40 }),
        ),
      );
    }
  }, [status, scale, opacity, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.get(),
    transform: [{ scale: scale.get() }, { translateX: translateX.get() }],
  }));

  const isCheckmate = status === "CHECKMATE";

  return (
    <Animated.View style={[styles.centerStatusOverlay, animatedStyle]}>
      <View style={styles.monsterWrapper}>
        <Animated.Image
          source={require("../../../../assets/images/logo/logo.png")}
          style={styles.monsterImage}
        />
        <View
          style={[
            styles.statusCard,
            { backgroundColor: isCheckmate ? "#7F1D1D" : "#18181B" },
          ]}
        >
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  centerStatusOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    pointerEvents: "none",
  },
  monsterWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  monsterImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginBottom: 8,
  },
  statusCard: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  statusText: {
    color: "#FAFAFA",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 3,
  },
});
