import useGridDisplay from "../../features/grid-display/hooks/use-grid-display";
import { LetterPlacement } from "../../types/word-placement";

interface GridBoxProps {
  data: LetterPlacement | undefined;
}

export default function GridBox({ data }: GridBoxProps) {
  const { gridDisplay, hideAnswers } = useGridDisplay();

  return (
    <div
      className={`position-relative d-flex justify-content-center align-items-center ps-1 pt-1 text-uppercase
      }`}
      style={{
        width: gridDisplay.boxSizePixels,
        height: gridDisplay.boxSizePixels,
        margin: gridDisplay.boxMarginPixels,
        lineHeight: `${gridDisplay.boxSizePixels}px`,
        fontSize: gridDisplay.boxSizePixels * 0.75,
        backgroundColor: data?.letter ? gridDisplay.boxColor : "transparent",
        border: data?.letter
          ? `${gridDisplay.boxBorderWidth}px solid ${gridDisplay.boxBorderColor}`
          : "none",
      }}
    >
      <div
        className="position-absolute top-0 start-0 m-1"
        style={{
          fontSize: 0.25 * gridDisplay.boxSizePixels,
          lineHeight: `${0.25 * gridDisplay.boxSizePixels}px`,
        }}
      >
        {data ? data.number : ""}
      </div>
      {data && !hideAnswers ? data.letter : ""}
    </div>
  );
}
