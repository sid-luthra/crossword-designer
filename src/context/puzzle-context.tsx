import { ReactNode, createContext, useState } from "react";
import useScreenDims from "../hooks/use-screen-dims";

export type PuzzleContextType = {
  puzzleDims: { width: number; height: number };
  setPuzzleDims: (dims: { width: number; height: number }) => void;
  displayDims: { displayWidth: number; displayHeight: number };
  pixelsPerInch: number;
  background: string;
  setBackground: (background: string) => void;
  title: {
    text: string;
    fontSize: number;
    font: string;
  };
  setTitle: ({
    text,
    fontSize,
  }: {
    text: string;
    fontSize: number;
    font: string;
  }) => void;
  boxSize: number;
  setBoxSize: (boxSize: number) => void;
};

export const PuzzleContext = createContext<PuzzleContextType>({
  puzzleDims: { width: 5, height: 3 },
  setPuzzleDims: () => {},
  displayDims: { displayWidth: 0, displayHeight: 0 },
  pixelsPerInch: 0,
  title: { text: "Sip & Solve", fontSize: 200, font: "cursive" },
  setTitle: () => {},
  background: "Grass",
  setBackground: () => {},
  boxSize: 2,
  setBoxSize: () => {},
});

export function PuzzleProvider({ children }: { children: ReactNode }) {
  const [puzzleDims, setPuzzleDims] = useState({ width: 5, height: 3 });
  const [background, setBackground] = useState("Grass");
  const [title, setTitle] = useState({
    text: "Sip & Solve",
    fontSize: 200,
    font: "cursive",
  });
  const [boxSize, setBoxSize] = useState(2);

  const screenDims = useScreenDims();

  const getPuzzlePixels = () => {
    const { width, height } = puzzleDims;

    const puzzleHeightRatio = height / width;
    const screenHeightRatio = screenDims.height / screenDims.width;

    if (puzzleHeightRatio > screenHeightRatio) {
      const displayHeight = screenDims.height * 0.8;
      const displayWidth = displayHeight / puzzleHeightRatio;
      return { displayWidth, displayHeight };
    }

    const displayWidth = screenDims.width * 0.8 * 0.9;
    const displayHeight = displayWidth * puzzleHeightRatio;
    return { displayWidth, displayHeight };
  };

  const displayDims = getPuzzlePixels();

  const pixelsPerInch = displayDims.displayWidth / puzzleDims.width / 12;

  const value = {
    background,
    setBackground,
    puzzleDims,
    setPuzzleDims,
    displayDims,
    pixelsPerInch,
    title,
    setTitle,
    boxSize,
    setBoxSize,
  };

  return (
    <PuzzleContext.Provider value={value}>{children}</PuzzleContext.Provider>
  );
}
