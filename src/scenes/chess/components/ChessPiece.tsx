import React, { memo, useEffect } from "react";
import { Image, StyleSheet, Vibration } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useChessGame } from "../hooks/useChessGame";
import { ChessPieceData } from "../types/chess";
import { getChessCoordinates, getChessField } from "../utils/chessMath";

type ChessPieceProps = {
  piece: ChessPieceData;
  cellSize: number;
};

const PIECE_IMAGES: Record<string, any> = {
  white_p: require("../../../../assets/images/chess/white/pawn.png"),
  white_r: require("../../../../assets/images/chess/white/rook.png"),
  white_n: require("../../../../assets/images/chess/white/knight.png"),
  white_b: require("../../../../assets/images/chess/white/bishop.png"),
  white_q: require("../../../../assets/images/chess/white/queen.png"),
  white_k: require("../../../../assets/images/chess/white/king.png"),
  black_p: require("../../../../assets/images/chess/black/pawn.png"),
  black_r: require("../../../../assets/images/chess/black/rook.png"),
  black_n: require("../../../../assets/images/chess/black/knight.png"),
  black_b: require("../../../../assets/images/chess/black/bishop.png"),
  black_q: require("../../../../assets/images/chess/black/queen.png"),
  black_k: require("../../../../assets/images/chess/black/king.png"),
};

export const ChessPiece = memo(function ChessPiece({
  piece,
  cellSize,
}: ChessPieceProps) {
  const { selectPiece, executeMove, legalMoves, selectedPieceId, turn, status } =
    useChessGame();
  const isGameLocked = status === "CHECKMATE";

  const initialCoords = getChessCoordinates(piece.position, cellSize);
  const translateX = useSharedValue(initialCoords.x);
  const translateY = useSharedValue(initialCoords.y);
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const legalMovesSV = useSharedValue<string[]>([]);
  const isWrongTurn = useSharedValue(false);

  useEffect(() => {
    const targetCoords = getChessCoordinates(piece.position, cellSize);
    if (
      translateX.get() !== targetCoords.x ||
      translateY.get() !== targetCoords.y
    ) {
      translateX.set(withTiming(targetCoords.x, { duration: 200 }));
      translateY.set(withTiming(targetCoords.y, { duration: 200 }));
    }
  }, [piece.position, cellSize, translateX, translateY]);

  useEffect(() => {
    if (selectedPieceId === piece.id) {
      legalMovesSV.set(legalMoves);
    } else {
      legalMovesSV.set([]);
    }
  }, [legalMoves, selectedPieceId, piece.id, legalMovesSV]);

  const tapGesture = Gesture.Tap().onStart(() => {
    if (isGameLocked) {
      return;
    }
    if (piece.color !== turn) {
      runOnJS(Vibration.vibrate)(100);
      return;
    }
    runOnJS(selectPiece)(selectedPieceId === piece.id ? null : piece.id);
  });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      if (isGameLocked) {
        isWrongTurn.set(true);
        return;
      }
      if (piece.color !== turn) {
        isWrongTurn.set(true);
        runOnJS(Vibration.vibrate)(100);
        return;
      }
      isWrongTurn.set(false);
      runOnJS(selectPiece)(piece.id);
      startX.set(translateX.get());
      startY.set(translateY.get());
      scale.set(withTiming(1.25, { duration: 50 }));
      shadowOpacity.set(withTiming(0.4, { duration: 50 }));
    })
    .onChange((event) => {
      if (isWrongTurn.get()) return;
      translateX.set(startX.get() + event.translationX);
      translateY.set(startY.get() + event.translationY);
    })
    .onEnd(() => {
      if (isWrongTurn.get()) {
        isWrongTurn.set(false);
        return;
      }

      scale.set(withTiming(1, { duration: 100 }));
      shadowOpacity.set(withTiming(0, { duration: 100 }));

      const currentX = translateX.get();
      const currentY = translateY.get();
      const targetField = getChessField(
        currentX,
        currentY,
        cellSize,
      ).toLowerCase();

      const legals = legalMovesSV.get();
      const isLegal = legals.includes(targetField);

      if (isLegal) {
        const targetCoords = getChessCoordinates(targetField, cellSize);
        translateX.set(withTiming(targetCoords.x, { duration: 150 }));
        translateY.set(withTiming(targetCoords.y, { duration: 150 }));
        runOnJS(executeMove)(piece.position, targetField);
      } else {
        runOnJS(Vibration.vibrate)([0, 120, 80, 120]);
        translateX.set(withTiming(startX.get(), { duration: 150 }));
        translateY.set(withTiming(startY.get(), { duration: 150 }));
      }

      runOnJS(selectPiece)(null);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    width: cellSize,
    height: cellSize,
    zIndex: selectedPieceId === piece.id ? 999 : 10,
    transform: [
      { translateX: translateX.get() },
      { translateY: translateY.get() },
      { scale: scale.get() },
    ],
    shadowOpacity: shadowOpacity.get(),
  }));

  const symbolKey = `${piece.color}_${piece.type}`;
  const imageAsset = PIECE_IMAGES[symbolKey];

  return (
    <GestureDetector
      gesture={Gesture.Race(
        panGesture.enabled(!isGameLocked),
        tapGesture.enabled(!isGameLocked),
      )}
    >
      <Animated.View style={[styles.pieceContainer, animatedStyle]}>
        {imageAsset && (
          <Image
            source={imageAsset}
            style={{
              width: cellSize,
              height: cellSize,
              resizeMode: "contain",
            }}
            fadeDuration={0}
          />
        )}
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  pieceContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});
