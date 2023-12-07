import { WordPlacement } from "../../types/word-placement";

interface ClueDisplayProps {
  title: string;
  words: WordPlacement[];
  horizontal: boolean;
  onHoverWord: (word: string) => void;
}

export default function ClueDisplay({
  title,
  words,
  horizontal,
  onHoverWord,
}: ClueDisplayProps) {
  return (
    <div className="clue-container">
      <div>
        <h2>{title}</h2>
        {words.map(
          (word) =>
            word.horizontal === horizontal && (
              <div
                key={word.word}
                onMouseEnter={() => onHoverWord(word.word)}
                onMouseLeave={() => onHoverWord("")}
              >
                {word.number}. {word.word}
              </div>
            )
        )}
      </div>
    </div>
  );
}
