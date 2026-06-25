import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useChessGame } from "../hooks/useChessGame";
import { BoardGrid } from "./BoardGrid";
import { BoardLockOverlay } from "./BoardLockOverlay";
import { BoardMarkers } from "./BoardMarkers";
import { ChessPiece } from "./ChessPiece";
import { MonsterOverlay } from "./MonsterOverlay";
import { MoveTouchTargets } from "./MoveTouchTargets";
import { RestartGameButton } from "./RestartGameButton";
import { TurnBadge } from "./TurnBadge";

export const ChessBoard = () => {
  const {
    pieces,
    legalMoves,
    turn,
    status,
    selectedPieceId,
    executeMove,
    resetGame,
  } = useChessGame();
  const { width } = useWindowDimensions();
  const cellSize = Math.floor((width - 12) / 8);
  const boardSize = cellSize * 8;

  const uniqueLegalMoves = Array.from(new Set(legalMoves));
  const isCheckMode = status === "CHECK" || status === "CHECKMATE";
  const isCheckmate = status === "CHECKMATE";

  const kingInCheck = pieces.find((p) => p.type === "k" && p.color === turn);
  const checkField = kingInCheck && isCheckMode ? kingInCheck.position : null;

  const handleFieldTap = (targetField: string) => {
    if (isCheckmate) return;
    const selectedPiece = pieces.find((p) => p.id === selectedPieceId);
    if (selectedPiece) {
      executeMove(selectedPiece.position, targetField);
    }
  };

  return (
    <View style={[styles.wrapper, { width: boardSize }]}>
      <TurnBadge turn={turn} />

      <View style={[styles.container, { width: boardSize, height: boardSize }]}>
        <BoardGrid cellSize={cellSize} />

        <BoardMarkers
          cellSize={cellSize}
          checkField={checkField}
          isCheckMode={isCheckMode}
          legalMoves={uniqueLegalMoves}
          selectedPieceId={selectedPieceId}
          status={status}
        />

        {pieces.map((piece) => (
          <ChessPiece key={piece.id} piece={piece} cellSize={cellSize} />
        ))}

        {!isCheckmate && (
          <MoveTouchTargets
            cellSize={cellSize}
            legalMoves={uniqueLegalMoves}
            onFieldPress={handleFieldTap}
          />
        )}

        {isCheckmate && <BoardLockOverlay />}

        {isCheckMode && <MonsterOverlay status={status} />}
      </View>

      {isCheckmate && <RestartGameButton onPress={resetGame} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "center",
  },
  container: {
    position: "relative",
  },
});
