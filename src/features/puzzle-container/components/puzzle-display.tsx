import { ReactNode } from "react";
import usePuzzleDisplay from "../hooks/use-puzzle-display";

export default function PuzzleDisplay({ children }: { children: ReactNode }) {
  const { puzzleBoard, background } = usePuzzleDisplay();

  return (
    <div
      className="position-relative overflow-hidden"
      style={{
        width: puzzleBoard.widthPixels,
        height: puzzleBoard.heightPixels,
        padding: puzzleBoard.paddingPixels,
        position: "relative",
        overflow: "hidden",
        backgroundColor:
          background.type === "transparent" ? "none" : "rgba(255,255,255,0.2)",
        boxShadow:
          background.type === "transparent" ? "none" : "3px 3px 20px black",
        border: background.type === "transparent" ? "1px solid white" : "none",
      }}
    >
      {children}
    </div>
  );
}
