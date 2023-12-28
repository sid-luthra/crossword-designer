import {
  selectPuzzle,
  setPuzzleDimsInches,
  setPuzzleDimsPixels,
  setPuzzlePadding,
} from "../../../store/puzzle-slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useCallback, useEffect } from "react";

const BACKGROUND_PADDING = 0.1;

const PRESETS = [
  {
    label: "4' x 3'",
    widthInches: 48,
    heightInches: 36,
  },
  {
    label: "4' x 4'",
    widthInches: 48,
    heightInches: 48,
  },
  {
    label: "4' x 5'",
    widthInches: 60,
    heightInches: 48,
  },
  {
    label: "4' x 6'",
    widthInches: 72,
    heightInches: 48,
  },
];

export default function usePuzzleDisplay() {
  const { background, puzzleBoard } = useAppSelector(selectPuzzle);
  const dispatch = useAppDispatch();

  const getPuzzlePixels = useCallback(() => {
    const puzzleBounds = {
      width: background.width * (1 - BACKGROUND_PADDING),
      height: background.height * (1 - BACKGROUND_PADDING),
    };

    const backgroundHeightRatio = background.height / background.width;
    const puzzleHeightRatio =
      puzzleBoard.heightInches / puzzleBoard.widthInches;

    if (puzzleHeightRatio > backgroundHeightRatio) {
      const heightPixels = Math.round(puzzleBounds.height);
      const widthPixels = Math.round(heightPixels / puzzleHeightRatio);
      const pixelsPerInch = Math.round(widthPixels / puzzleBoard.widthInches);
      return { widthPixels, heightPixels, pixelsPerInch };
    }

    const widthPixels = Math.round(puzzleBounds.width);
    const heightPixels = Math.round(widthPixels * puzzleHeightRatio);
    const pixelsPerInch = Math.round(widthPixels / puzzleBoard.widthInches);
    return { widthPixels, heightPixels, pixelsPerInch };
  }, [background, puzzleBoard.heightInches, puzzleBoard.widthInches]);

  useEffect(() => {
    const newDims = getPuzzlePixels();
    dispatch(setPuzzleDimsPixels(newDims));
  }, [dispatch, getPuzzlePixels]);

  useEffect(() => {
    const newPaddingPixels =
      puzzleBoard.paddingInches * puzzleBoard.pixelsPerInch;
    dispatch(
      setPuzzlePadding({
        paddingInches: puzzleBoard.paddingInches,
        paddingPixels: newPaddingPixels,
      })
    );
  }, [dispatch, puzzleBoard.paddingInches, puzzleBoard.pixelsPerInch]);

  const presets = PRESETS.sort((a, b) => {
    return a.widthInches - b.widthInches;
  });

  const handleDimsChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const label = event.target.value;
      const preset = presets.find((preset) => preset.label === label);
      if (!preset) {
        return;
      }
      dispatch(setPuzzleDimsInches(preset));
    },
    [dispatch, presets]
  );

  const handlePaddingChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const paddingInches = parseFloat(event.target.value);
      const paddingPixels = paddingInches * puzzleBoard.pixelsPerInch;
      dispatch(setPuzzlePadding({ paddingInches, paddingPixels }));
    },
    [dispatch, puzzleBoard.pixelsPerInch]
  );

  return {
    puzzleBoard,
    presets,
    handleDimsChange,
    handlePaddingChange,
    background,
  };
}
