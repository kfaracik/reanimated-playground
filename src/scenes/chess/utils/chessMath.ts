export const getChessCoordinates = (position: string, cellSize: number) => {
  "worklet";
  if (!position || typeof position !== "string" || position.length < 2) {
    return { x: 0, y: 0 };
  }
  const cleanPos = position.toLowerCase();
  const col = cleanPos.charCodeAt(0) - 97;
  const row = 8 - parseInt(cleanPos.charAt(1), 10);

  if (isNaN(col) || isNaN(row) || col < 0 || col > 7 || row < 0 || row > 7) {
    return { x: 0, y: 0 };
  }

  return {
    x: col * cellSize,
    y: row * cellSize,
  };
};

export const getChessField = (x: number, y: number, cellSize: number) => {
  "worklet";
  const colIndex = Math.floor((x + cellSize / 2) / cellSize);
  const rowIndex = Math.floor((y + cellSize / 2) / cellSize);
  const clampedCol = Math.max(0, Math.min(7, colIndex));
  const clampedRow = Math.max(0, Math.min(7, rowIndex));
  const colLetter = String.fromCharCode(97 + clampedCol);
  const rowNumber = 8 - clampedRow;
  return `${colLetter}${rowNumber}`;
};
