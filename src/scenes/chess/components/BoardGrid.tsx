import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

type BoardGridProps = {
  cellSize: number;
};

const BoardGridComponent = ({ cellSize }: BoardGridProps) => {
  const boardSize = cellSize * 8;
  const rows = Array.from({ length: 8 });
  const cols = Array.from({ length: 8 });

  return (
    <View style={[styles.grid, { width: boardSize, height: boardSize }]}>
      {rows.map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {cols.map((_, colIndex) => (
            <View
              key={colIndex}
              style={[
                styles.cell,
                {
                  backgroundColor:
                    (rowIndex + colIndex) % 2 === 1 ? "#27272A" : "#D1D0C6",
                },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export const BoardGrid = memo(BoardGridComponent);

const styles = StyleSheet.create({
  grid: {
    backgroundColor: "#27272A",
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
  cell: {
    flex: 1,
  },
});
