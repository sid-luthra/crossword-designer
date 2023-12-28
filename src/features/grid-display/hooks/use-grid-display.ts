import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectPuzzle, setGridDisplay } from "../../../store/puzzle-slice";

export default function useGridDisplay() {
  const { puzzleBoard, gridDisplay, title, clueDisplay } =
    useAppSelector(selectPuzzle);
  const dispatch = useAppDispatch();

  const { widthPixels, heightPixels, paddingPixels } = puzzleBoard;

  const { hideAnswers } = clueDisplay;

  useEffect(() => {
    const gridBounds = {
      widthPixels:
        ((widthPixels - paddingPixels * 2) * gridDisplay.percentWidth) / 100,
      heightPixels:
        ((heightPixels -
          paddingPixels * 2 -
          title.heightPixels -
          title.marginBottomInches * puzzleBoard.pixelsPerInch) *
          gridDisplay.percentHeight) /
        100,
    };

    dispatch(setGridDisplay({ ...gridBounds }));
  }, [
    dispatch,
    gridDisplay.boxSizePixels,
    gridDisplay.percentWidth,
    gridDisplay.percentHeight,
    heightPixels,
    paddingPixels,
    widthPixels,
    title.heightPixels,
    title.marginBottomInches,
    puzzleBoard.pixelsPerInch,
  ]);

  useEffect(() => {
    const marginPixels = {
      marginRightPixels: Math.floor(
        gridDisplay.marginRightInches * puzzleBoard.pixelsPerInch
      ),
      marginBottomPixels: Math.floor(
        gridDisplay.marginBottomInches * puzzleBoard.pixelsPerInch
      ),
      boxMarginPixels: Math.floor(
        gridDisplay.boxMarginInches * puzzleBoard.pixelsPerInch
      ),
    };

    dispatch(setGridDisplay({ ...marginPixels }));
  }, [
    dispatch,
    gridDisplay.marginRightInches,
    gridDisplay.marginBottomInches,
    gridDisplay.boxMarginInches,
    puzzleBoard.pixelsPerInch,
  ]);

  useEffect(() => {
    const boxSizePixels = Math.floor(
      gridDisplay.boxSizeInches * puzzleBoard.pixelsPerInch
    );
    const boxCounts = {
      boxCountX: Math.floor(
        gridDisplay.widthPixels /
          (boxSizePixels + 2 * gridDisplay.boxMarginPixels)
      ),
      boxCountY: Math.floor(
        gridDisplay.heightPixels /
          (boxSizePixels + 2 * gridDisplay.boxMarginPixels)
      ),
    };

    dispatch(setGridDisplay({ ...boxCounts, boxSizePixels }));
  }, [
    dispatch,
    gridDisplay.heightPixels,
    gridDisplay.widthPixels,
    gridDisplay.boxSizeInches,
    gridDisplay.boxMarginPixels,
    puzzleBoard.pixelsPerInch,
  ]);

  const handleGridDisplayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setGridDisplay({
        [e.target.name]: e.target.value,
      })
    );
  };

  const changeGridValue = (name: string, value: string | number) => {
    dispatch(
      setGridDisplay({
        [name]: value,
      })
    );
  };

  return { gridDisplay, handleGridDisplayChange, hideAnswers, changeGridValue };
}
