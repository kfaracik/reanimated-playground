import React from "react";
import { StyleSheet, View } from "react-native";
import { getChessCoordinates } from "../utils/chessMath";

type BoardMarkersProps = {
  cellSize: number;
  checkField: string | null;
  isCheckMode: boolean;
  legalMoves: string[];
  selectedPieceId: string | null;
  status: string;
};

export const BoardMarkers = ({
  cellSize,
  checkField,
  isCheckMode,
  legalMoves,
  selectedPieceId,
  status,
}: BoardMarkersProps) => (
  <>
    {checkField && <CheckMarker field={checkField} cellSize={cellSize} />}
    {status === "PLAYING" && (
      <LegalMoveMarkers legalMoves={legalMoves} cellSize={cellSize} />
    )}
    {isCheckMode && selectedPieceId && (
      <LegalMoveMarkers legalMoves={legalMoves} cellSize={cellSize} />
    )}
  </>
);

const CheckMarker = ({
  field,
  cellSize,
}: {
  field: string;
  cellSize: number;
}) => {
  const coords = getChessCoordinates(field, cellSize);

  return (
    <View
      style={[
        styles.boardMarkerCell,
        {
          left: coords.x,
          top: coords.y,
          width: cellSize,
          height: cellSize,
        },
      ]}
    >
      <View
        style={[
          styles.forbiddenRing,
          {
            width: cellSize - 4,
            height: cellSize - 4,
          },
        ]}
      />
    </View>
  );
};

const LegalMoveMarkers = ({
  legalMoves,
  cellSize,
}: {
  legalMoves: string[];
  cellSize: number;
}) => (
  <>
    {legalMoves.map((field, index) => {
      if (!field) return null;
      const coords = getChessCoordinates(field, cellSize);
      return (
        <View
          key={`legal-${field}-${index}`}
          style={[
            styles.boardMarkerCell,
            {
              left: coords.x,
              top: coords.y,
              width: cellSize,
              height: cellSize,
            },
          ]}
        >
          <View style={styles.highlightDot} />
        </View>
      );
    })}
  </>
);

const styles = StyleSheet.create({
  boardMarkerCell: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    pointerEvents: "none",
  },
  highlightDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#71717AA6",
    borderWidth: 2,
    borderColor: "#FFFFFF66",
  },
  forbiddenRing: {
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#EF4444",
    backgroundColor: "#EF44444D",
  },
});
