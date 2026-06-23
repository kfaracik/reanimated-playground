import React from "react";
import { StyleSheet, Text, View } from "react-native";

type LevelBadgeProps = {
  title: string;
  solvedLabel: string;
  isSolved: boolean;
};

export const LevelBadge = ({
  title,
  solvedLabel,
  isSolved,
}: LevelBadgeProps) => (
  <View style={[styles.badge, isSolved && styles.badgeSolved]}>
    <Text style={[styles.badgeText, isSolved && styles.badgeTextSolved]}>
      {isSolved ? solvedLabel : title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#18181B",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#FFFFFF14",
  },
  badgeSolved: {
    backgroundColor: "#22C55E26",
    borderColor: "#00FF66",
  },
  badgeText: {
    color: "#00F0FF",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 0.8,
  },
  badgeTextSolved: {
    color: "#00FF66",
  },
});
