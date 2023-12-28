import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectPuzzle, setTitle } from "../../../store/puzzle-slice";

export default function useTitle() {
  const titleRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { puzzleBoard, title } = useAppSelector(selectPuzzle);

  useEffect(() => {
    if (!titleRef.current) return;

    const marginBottomPixels = Math.round(
      title.marginBottomInches * puzzleBoard.pixelsPerInch
    );

    const setHeight = () => {
      const height = titleRef.current!.offsetHeight;
      dispatch(
        setTitle({
          heightPixels: height,
          marginBottomPixels,
        })
      );
    };

    setHeight();
  }, [
    dispatch,
    titleRef,
    puzzleBoard.heightPixels,
    puzzleBoard.pixelsPerInch,
    title.marginBottomInches,
  ]);

  const fontSizePixels = Math.round(
    (title.fontSize * puzzleBoard.pixelsPerInch) / 72
  );

  const handleTitleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    dispatch(
      setTitle({
        [e.target.name]: e.target.value,
      })
    );
  };

  const setTitleColor = (color: string) => {
    dispatch(
      setTitle({
        color,
      })
    );
  };

  return {
    titleRef,
    title,
    fontSizePixels,
    handleTitleChange,
    setTitleColor,
  };
}
