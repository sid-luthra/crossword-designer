import { selectGrid } from "../../../store/grid-slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectPuzzle, setClueDisplay } from "../../../store/puzzle-slice";

export default function useClueList() {
  const { clueDisplay, puzzleBoard } = useAppSelector(selectPuzzle);
  const grid = useAppSelector(selectGrid);
  const dispatch = useAppDispatch();

  const words = grid.wordPlacements;

  const { heading, clueText, randomizeClues, hideAnswers } = clueDisplay;

  const headingFontSizePixels = Math.round(
    (heading.fontSize * puzzleBoard.pixelsPerInch) / 72
  );

  const clueTextFontSizePixels = Math.round(
    (clueText.fontSize * puzzleBoard.pixelsPerInch) / 72
  );

  const handleClueHeadingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch(
      setClueDisplay({
        heading: { ...heading, [e.target.name]: e.target.value },
      })
    );
  };

  const setHeadingColor = (color: string) => {
    dispatch(
      setClueDisplay({
        heading: { ...heading, color },
      })
    );
  };

  const handleClueTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch(
      setClueDisplay({
        clueText: { ...clueText, [e.target.name]: e.target.value },
      })
    );
  };

  const setClueTextColor = (color: string) => {
    dispatch(
      setClueDisplay({
        clueText: { ...clueText, color },
      })
    );
  };

  const setRandomizeClues = (randomizeClues: boolean) => {
    dispatch(setClueDisplay({ randomizeClues }));
  };

  const setHideAnswers = (hideAnswers: boolean) => {
    dispatch(setClueDisplay({ hideAnswers }));
  };

  return {
    heading,
    clueText,
    headingFontSizePixels,
    clueTextFontSizePixels,
    words,
    handleClueHeadingChange,
    setHeadingColor,
    handleClueTextChange,
    setClueTextColor,
    randomizeClues,
    setRandomizeClues,
    hideAnswers,
    setHideAnswers,
  };
}
