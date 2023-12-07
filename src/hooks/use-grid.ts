import { useState } from "react";
import { WordGrid } from "../types/word-placement";
import {
  compareGrids,
  createGrid,
  getGridNumbers,
} from "../helpers/grid-creation";

interface UseGridProps {
  sizeX: number;
  sizeY: number;
  words: string[];
  iterations: number;
}

const initialGrid: WordGrid = {
  wordPlacements: [],
  sizeX: 0,
  sizeY: 0,
  score: 0,
};

export default function useGrid() {
  const [grid, setGrid] = useState<WordGrid>(initialGrid);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  async function generateGrid({
    sizeX,
    sizeY,
    words,
    iterations,
  }: UseGridProps) {
    setLoading(true);
    setGrid(initialGrid);
    setAttempts(0);
    for (let i = 0; i < iterations; i++) {
      await new Promise((resolve) => setTimeout(resolve, 10));
      const newGrid = createGrid({ sizeX, sizeY, words });
      setGrid((prevGrid) => {
        if (prevGrid && prevGrid !== initialGrid) {
          return compareGrids(prevGrid, newGrid);
        }
        return newGrid;
      });
      setAttempts((currentAttempts) => currentAttempts + 1);
    }
    setLoading(false);
  }

  const numberedGrid = getGridNumbers(grid);

  return {
    grid: numberedGrid,
    generateGrid,
    attempts,
    loading,
  };
}
