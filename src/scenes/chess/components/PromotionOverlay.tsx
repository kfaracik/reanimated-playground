import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useChessGame } from "../hooks/useChessGame";
import { PieceType } from "../types/chess";

export const PromotionOverlay = () => {
  const { status, promotionCandidate, resolvePromotion } = useChessGame();

  if (status !== "PROMOTION_PENDING" || !promotionCandidate) {
    return null;
  }

  const isWhite = promotionCandidate.color === "white";
  const options: { type: PieceType; symbol: string }[] = [
    { type: "q", symbol: isWhite ? "♕" : "♛" },
    { type: "r", symbol: isWhite ? "♖" : "♜" },
    { type: "b", symbol: isWhite ? "♗" : "♝" },
    { type: "n", symbol: isWhite ? "♘" : "♞" },
  ];

  return (
    <View style={styles.overlay}>
      <View style={styles.background} />
      <View style={styles.menu}>
        <Text style={styles.title}>PROMOTION</Text>
        <View style={styles.optionsRow}>
          {options.map((option) => (
            <Pressable
              key={option.type}
              style={({ pressed }) => [
                styles.optionButton,
                pressed && styles.pressed,
              ]}
              onPress={() => resolvePromotion(option.type)}
            >
              <Text style={styles.symbol}>{option.symbol}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000000",
    opacity: 0.85,
  },
  menu: {
    backgroundColor: "#18181B",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#27272A",
    zIndex: 101,
  },
  title: {
    color: "#FAFAFA",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 20,
  },
  optionsRow: {
    flexDirection: "row",
    gap: 16,
  },
  optionButton: {
    width: 60,
    height: 60,
    backgroundColor: "#27272A",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  symbol: {
    color: "#FAFAFA",
    fontSize: 32,
  },
});
