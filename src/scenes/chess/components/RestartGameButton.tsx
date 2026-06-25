import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type RestartGameButtonProps = {
  onPress: () => void;
};

export const RestartGameButton = ({ onPress }: RestartGameButtonProps) => (
  <Pressable
    style={({ pressed }) => [
      styles.restartButton,
      pressed && styles.restartButtonPressed,
    ]}
    onPress={onPress}
  >
    <Text style={styles.restartText}>NOWA GRA</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  restartButton: {
    alignSelf: "center",
    marginTop: 18,
    backgroundColor: "#FAFAFA",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 14,
  },
  restartButtonPressed: {
    opacity: 0.85,
  },
  restartText: {
    color: "#18181B",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
});
