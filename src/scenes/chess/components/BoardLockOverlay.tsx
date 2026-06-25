import React from "react";
import { StyleSheet, View } from "react-native";

export const BoardLockOverlay = () => <View style={styles.boardLockOverlay} />;

const styles = StyleSheet.create({
  boardLockOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#00000001",
    zIndex: 120,
  },
});
