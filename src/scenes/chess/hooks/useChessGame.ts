import { useContext } from "react";
import { ChessGameContext } from "../context/ChessGameContext";

export const useChessGame = () => {
  const context = useContext(ChessGameContext);
  if (context === undefined) {
    throw new Error("useChessGame must be used within a ChessGameProvider");
  }
  return context;
};
