import { Game } from "js-chess-engine";
import React, {
    createContext,
    ReactNode,
    useCallback,
    useRef,
    useState,
} from "react";
import { Vibration } from "react-native";
import {
    ChessPieceData,
    GameStatus,
    PieceColor,
    PieceType,
    PromotionCandidate,
} from "../types/chess";

type ChessGameContextType = {
  pieces: ChessPieceData[];
  turn: PieceColor;
  status: GameStatus;
  legalMoves: string[];
  selectedPieceId: string | null;
  promotionCandidate: PromotionCandidate | null;
  selectPiece: (id: string | null) => void;
  executeMove: (from: string, to: string) => void;
  resolvePromotion: (type: PieceType) => void;
  resetGame: () => void;
};

export const ChessGameContext = createContext<ChessGameContextType | undefined>(
  undefined,
);

const INITIAL_LAYOUT: Omit<ChessPieceData, "id">[] = [
  { type: "r", color: "black", position: "a8" },
  { type: "n", color: "black", position: "b8" },
  { type: "b", color: "black", position: "c8" },
  { type: "q", color: "black", position: "d8" },
  { type: "k", color: "black", position: "e8" },
  { type: "b", color: "black", position: "f8" },
  { type: "n", color: "black", position: "g8" },
  { type: "r", color: "black", position: "h8" },
  { type: "p", color: "black", position: "a7" },
  { type: "p", color: "black", position: "b7" },
  { type: "p", color: "black", position: "c7" },
  { type: "p", color: "black", position: "d7" },
  { type: "p", color: "black", position: "e7" },
  { type: "p", color: "black", position: "f7" },
  { type: "p", color: "black", position: "g7" },
  { type: "p", color: "black", position: "h7" },
  { type: "p", color: "white", position: "a2" },
  { type: "p", color: "white", position: "b2" },
  { type: "p", color: "white", position: "c2" },
  { type: "p", color: "white", position: "d2" },
  { type: "p", color: "white", position: "e2" },
  { type: "p", color: "white", position: "f2" },
  { type: "p", color: "white", position: "g2" },
  { type: "p", color: "white", position: "h2" },
  { type: "r", color: "white", position: "a1" },
  { type: "n", color: "white", position: "b1" },
  { type: "b", color: "white", position: "c1" },
  { type: "q", color: "white", position: "d1" },
  { type: "k", color: "white", position: "e1" },
  { type: "b", color: "white", position: "f1" },
  { type: "n", color: "white", position: "g1" },
  { type: "r", color: "white", position: "h1" },
];

const createInitialPieces = (): ChessPieceData[] => {
  return INITIAL_LAYOUT.map((piece, index) => ({
    ...piece,
    id: `${piece.color}_${piece.type}_${index}`,
  }));
};

export const ChessGameProvider = ({ children }: { children: ReactNode }) => {
  const [pieces, setPieces] = useState<ChessPieceData[]>(createInitialPieces);
  const [turn, setTurn] = useState<PieceColor>("white");
  const [status, setStatus] = useState<GameStatus>("PLAYING");
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [promotionCandidate, setPromotionCandidate] =
    useState<PromotionCandidate | null>(null);

  const engineRef = useRef(new Game());

  const selectPiece = useCallback(
    (id: string | null) => {
      if (status === "CHECKMATE") {
        setSelectedPieceId(null);
        setLegalMoves([]);
        return;
      }
      setSelectedPieceId(id);
      if (!id) {
        setLegalMoves([]);
        return;
      }
      const piece = pieces.find((p) => p.id === id);
      const currentEngineTurn = engineRef.current
        .exportJson()
        .turn.toLowerCase();
      if (piece && piece.color === currentEngineTurn) {
        try {
          const movesMap = engineRef.current.moves(piece.position);
          const upperPos = piece.position.toUpperCase();
          const movesArray = movesMap[upperPos] || [];
          setLegalMoves(movesArray.map((m) => m.toLowerCase()));
        } catch {
          setLegalMoves([]);
        }
      } else {
        setLegalMoves([]);
      }
    },
    [pieces, status],
  );

  const executeMove = useCallback(
    (from: string, to: string) => {
      if (status === "CHECKMATE") {
        setSelectedPieceId(null);
        setLegalMoves([]);
        return;
      }

      const movingPiece = pieces.find(
        (p) => p.position.toLowerCase() === from.toLowerCase(),
      );
      if (
        !movingPiece ||
        movingPiece.color !== turn ||
        from.toLowerCase() === to.toLowerCase()
      )
        return;

      try {
        const legalsMap = engineRef.current.moves(from);
        const upperFrom = from.toUpperCase();
        const legalsArray = legalsMap[upperFrom] || [];
        if (
          !legalsArray.map((m) => m.toLowerCase()).includes(to.toLowerCase())
        ) {
          return;
        }
      } catch {
        return;
      }

      if (movingPiece.type === "p" && (to.endsWith("8") || to.endsWith("1"))) {
        setPromotionCandidate({ from, to, color: movingPiece.color });
        setStatus("PROMOTION_PENDING");
        setLegalMoves([]);
        setSelectedPieceId(null);
        return;
      }

      try {
        const isCapture = pieces.some(
          (p) => p.position.toLowerCase() === to.toLowerCase(),
        );

        engineRef.current.move(from, to);
        const jsonState = engineRef.current.exportJson();

        if (isCapture) {
          Vibration.vibrate([0, 40, 30, 40]);
        } else {
          Vibration.vibrate(15);
        }

        setPieces((prev) => {
          const filtered = prev.filter(
            (p) => p.position.toLowerCase() !== to.toLowerCase(),
          );
          return filtered.map((p) =>
            p.position.toLowerCase() === from.toLowerCase()
              ? { ...p, position: to }
              : p,
          );
        });

        setTurn(jsonState.turn.toLowerCase() as PieceColor);
        setSelectedPieceId(null);
        setLegalMoves([]);

        if (jsonState.checkMate) {
          setStatus("CHECKMATE");
        } else if (jsonState.check) {
          setStatus("CHECK");
        } else {
          setStatus("PLAYING");
        }
      } catch {
        setSelectedPieceId(null);
        setLegalMoves([]);
      }
    },
    [pieces, turn, status],
  );

  const resolvePromotion = useCallback(
    (type: PieceType) => {
      if (!promotionCandidate) return;
      const { from, to, color } = promotionCandidate;

      try {
        const isCapture = pieces.some(
          (p) => p.position.toLowerCase() === to.toLowerCase(),
        );

        engineRef.current.move(from, to);
        const pieceSymbol = (
          color === "white" ? type.toUpperCase() : type.toLowerCase()
        ) as any;
        engineRef.current.setPiece(to, pieceSymbol);

        if (isCapture) {
          Vibration.vibrate([0, 40, 30, 40]);
        } else {
          Vibration.vibrate(15);
        }

        setPieces((prev) => {
          const filtered = prev.filter(
            (p) => p.position.toLowerCase() !== to.toLowerCase(),
          );
          return filtered.map((p) =>
            p.position.toLowerCase() === from.toLowerCase()
              ? { ...p, position: to, type }
              : p,
          );
        });

        const jsonState = engineRef.current.exportJson();
        setTurn(jsonState.turn.toLowerCase() as PieceColor);
        setPromotionCandidate(null);
        setSelectedPieceId(null);
        setLegalMoves([]);

        if (jsonState.checkMate) {
          setStatus("CHECKMATE");
        } else if (jsonState.check) {
          setStatus("CHECK");
        } else {
          setStatus("PLAYING");
        }
      } catch {
        setPromotionCandidate(null);
        setSelectedPieceId(null);
        setLegalMoves([]);
        setStatus("PLAYING");
      }
    },
    [promotionCandidate, pieces],
  );

  const resetGame = useCallback(() => {
    engineRef.current = new Game();
    setPieces(createInitialPieces());
    setTurn("white");
    setStatus("PLAYING");
    setSelectedPieceId(null);
    setLegalMoves([]);
    setPromotionCandidate(null);
  }, []);

  return (
    <ChessGameContext.Provider
      value={{
        pieces,
        turn,
        status,
        legalMoves,
        selectedPieceId,
        promotionCandidate,
        selectPiece,
        executeMove,
        resolvePromotion,
        resetGame,
      }}
    >
      {children}
    </ChessGameContext.Provider>
  );
};
