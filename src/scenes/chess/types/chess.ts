export type PieceType = "p" | "r" | "n" | "b" | "q" | "k";

export type PieceColor = "white" | "black";

export type ChessPieceData = {
  id: string;
  type: PieceType;
  color: PieceColor;
  position: string;
};

export type GameStatus =
  | "PLAYING"
  | "PROMOTION_PENDING"
  | "CHECK"
  | "CHECKMATE"
  | "DRAW";

export type PromotionCandidate = {
  from: string;
  to: string;
  color: PieceColor;
};

export type TranslationFunction = (key: string) => string;
