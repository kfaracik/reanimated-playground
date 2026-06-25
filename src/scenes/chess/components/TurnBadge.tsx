import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieceColor } from "../types/chess";

type TurnBadgeProps = {
  turn: PieceColor;
};

export const TurnBadge = ({ turn }: TurnBadgeProps) => (
  <View style={styles.headerRow}>
    <View style={styles.turnContainer}>
      <View
        style={[
          styles.turnIndicator,
          { backgroundColor: turn === "white" ? "#FAFAFA" : "#18181B" },
        ]}
      />
      <Text style={styles.turnText}>
        {turn === "white" ? "BIAŁE" : "CZARNE"}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12,
  },
  turnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#3F3F46",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  turnIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#52525B",
  },
  turnText: {
    color: "#FAFAFA",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
});
