import { useEffect, useState } from "react";
import useFirestore from "../../../firebase/use-firestore";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectGrid, setGrid } from "../../../store/grid-slice";
import { selectPuzzle, setPuzzle } from "../../../store/puzzle-slice";

export default function useSavedPuzzle() {
  const { puzzleList, updatePuzzle, getPuzzle } = useFirestore();
  const [selectedPuzzle, setSelectedPuzzle] = useState<string>();
  const grid = useAppSelector(selectGrid);
  const puzzle = useAppSelector(selectPuzzle);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (puzzleList.length === 0) {
      return;
    }
    if (selectedPuzzle) {
      return;
    }
    setSelectedPuzzle(puzzleList[0].id);
  }, [puzzleList, selectedPuzzle]);

  const savePuzzle = () => {
    if (!selectedPuzzle) {
      return;
    }
    updatePuzzle(selectedPuzzle, { grid, puzzle });
  };

  const loadPuzzle = async () => {
    if (!selectedPuzzle) {
      return;
    }
    const selected = await getPuzzle(selectedPuzzle);
    if (!selected) {
      return;
    }
    dispatch(setGrid(selected.grid));
    dispatch(setPuzzle(selected.puzzle));
  };

  return {
    selectedPuzzle,
    setSelectedPuzzle,
    savePuzzle,
    loadPuzzle,
    puzzleList,
  };
}
