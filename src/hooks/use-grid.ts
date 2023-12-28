import {
  compareGrids,
  createGrid,
  getGridNumbers,
} from "../helpers/grid-creation";
import {
  selectGrid,
  setLoading,
  setGrid,
  resetGrid,
  incrementAttempts,
} from "../store/grid-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface UseGridProps {
  sizeX: number;
  sizeY: number;
  words: { clue: string; answer: string }[];
  iterations: number;
}

export default function useGrid() {
  const grid = useAppSelector(selectGrid);
  const dispatch = useAppDispatch();

  async function generateGrid({
    sizeX,
    sizeY,
    words,
    iterations,
  }: UseGridProps) {
    dispatch(setLoading(true));
    dispatch(resetGrid());
    let currentGrid = grid;
    for (let i = 0; i < iterations; i++) {
      await new Promise((resolve) => setTimeout(resolve, 10));
      const newGrid = createGrid({ sizeX, sizeY, words });

      const betterGrid = compareGrids(currentGrid, newGrid);
      currentGrid = betterGrid;
      dispatch(setGrid(betterGrid));

      dispatch(incrementAttempts());
    }
    const numberedGrid = getGridNumbers(currentGrid);
    dispatch(setGrid(numberedGrid));

    dispatch(setLoading(false));
  }

  return {
    grid,
    generateGrid,
  };
}
