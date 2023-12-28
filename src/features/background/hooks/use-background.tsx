import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectPuzzle,
  setBackgroundDimsPixels,
  setBackgroundType,
} from "../../../store/puzzle-slice";
import { useScreenshot, createFileName } from "use-react-screenshot";

export default function useBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { background } = useAppSelector(selectPuzzle);
  const dispatch = useAppDispatch();
  const [image, takeScreenShot] = useScreenshot({
    type: "image/png",
    quality: 10.0,
  });

  const download = (
    image: string,
    { name = "img", extension = "png" } = {}
  ) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = async () => {
    if (!backgroundRef.current) return;
    await takeScreenShot(backgroundRef.current);
  };

  const setBackground = (background: string) => {
    dispatch(setBackgroundType(background));
  };

  useEffect(() => {
    if (image) {
      download(image, { name: "screenshot", extension: "png" });
    }
  }, [image]);

  useEffect(() => {
    if (!backgroundRef.current) return;

    const handleResize = () => {
      const { width, height } = backgroundRef.current!.getBoundingClientRect();
      dispatch(setBackgroundDimsPixels({ width, height }));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [backgroundRef, dispatch]);

  return { backgroundRef, background, setBackground, downloadScreenshot };
}
