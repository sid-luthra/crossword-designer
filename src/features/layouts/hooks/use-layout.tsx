import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setPuzzleLayout } from "../../../store/puzzle-slice";

export default function useLayout() {
  const { gridDisplay, puzzleBoard, title } = useAppSelector(
    (state) => state.puzzle
  );
  const dispatch = useAppDispatch();

  const handleLayoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPuzzleLayout(e.target.value));
  };

  return {
    layout: puzzleBoard.layout,
    handleLayoutChange,
    gridWidth: gridDisplay.widthPixels,
    gridHeight: gridDisplay.heightPixels,
    invGridWidth:
      puzzleBoard.widthPixels -
      2 * puzzleBoard.paddingPixels -
      gridDisplay.marginRightPixels -
      gridDisplay.widthPixels,
    invGridHeight:
      puzzleBoard.heightPixels -
      2 * puzzleBoard.paddingPixels -
      gridDisplay.heightPixels -
      gridDisplay.marginBottomPixels -
      title.heightPixels -
      title.marginBottomPixels,
  };
}
