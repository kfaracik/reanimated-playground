import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { useChessGame } from "../hooks/useChessGame";

export const GameBanner = () => {
  const { status } = useChessGame();
  const translateY = useSharedValue(-100);

  useEffect(() => {
    if (status === "CHECK" || status === "CHECKMATE") {
      translateY.set(withSpring(0, { damping: 12, stiffness: 120 }));
    } else {
      translateY.set(withSpring(-100, { damping: 15, stiffness: 150 }));
    }
  }, [status, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.get() }],
  }));

  if (status !== "CHECK" && status !== "CHECKMATE") {
    return null;
  }

  const isCheckmate = status === "CHECKMATE";

  return (
    <Animated.View
      style={[
        styles.banner,
        animatedStyle,
        { backgroundColor: isCheckmate ? "#7F1D1D" : "#3F3F46" },
      ]}
    >
      <Text style={styles.text}>{status}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
  },
  text: {
    color: "#FAFAFA",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 3,
  },
});
