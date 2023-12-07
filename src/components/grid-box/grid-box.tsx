import { LetterPlacement } from "../../types/word-placement";
import "./grid-box.css";

interface GridBoxProps {
  data: LetterPlacement | undefined;
  className?: string;
  activeWords: string[];
  onHoverLetter?: (words: string[]) => void;
}

export default function GridBox({
  data,
  className,
  activeWords,
  onHoverLetter,
}: GridBoxProps) {
  const activeOverlap =
    data?.words.filter((word) => activeWords.includes(word)) || [];
  const isActive = activeOverlap.length > 0;

  return (
    <div
      onMouseEnter={() => onHoverLetter?.(data?.words || [])}
      onMouseLeave={() => onHoverLetter?.([])}
      className={`grid-box ${className} ${data?.letter ? "filled" : ""} ${
        isActive ? "active" : ""
      }`}
    >
      <div className={`grid-number ${isActive ? "active" : ""}`}>
        {data ? data.number : ""}
      </div>
      {data ? data.letter : ""}
    </div>
  );
}
