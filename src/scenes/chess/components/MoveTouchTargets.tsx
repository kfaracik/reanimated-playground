import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { getChessCoordinates } from "../utils/chessMath";

type MoveTouchTargetsProps = {
  cellSize: number;
  legalMoves: string[];
  onFieldPress: (field: string) => void;
};

export const MoveTouchTargets = ({
  cellSize,
  legalMoves,
  onFieldPress,
}: MoveTouchTargetsProps) => (
  <>
    {legalMoves.map((field, index) => {
      if (!field) return null;
      const coords = getChessCoordinates(field, cellSize);
      return (
        <Pressable
          key={`legal-touch-${field}-${index}`}
          style={[
            styles.moveTouchCell,
            {
              left: coords.x,
              top: coords.y,
              width: cellSize,
              height: cellSize,
            },
          ]}
          onPress={() => onFieldPress(field)}
        />
      );
    })}
  </>
);

const styles = StyleSheet.create({
  moveTouchCell: {
    position: "absolute",
    zIndex: 80,
  },
});
