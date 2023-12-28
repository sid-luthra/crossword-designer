import { loremIpsum } from "react-lorem-ipsum";
import { WordPlacement } from "../../../types/word-placement";
import useClueList from "../hooks/use-clue-list";

interface ClueDisplayProps {
  title: string;
  words: WordPlacement[];
  horizontal: boolean;
  columns?: number;
}

export default function ClueList({
  title,
  words,
  horizontal,
  columns = 1,
}: ClueDisplayProps) {
  const {
    heading,
    clueText,
    headingFontSizePixels,
    clueTextFontSizePixels,
    randomizeClues,
  } = useClueList();

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <div>
        <h2
          style={{
            fontFamily: heading.font,
            color: heading.color,
            fontSize: headingFontSizePixels,
          }}
        >
          {title}
        </h2>
        <div
          style={{
            columnCount: columns,
            fontFamily: clueText.font,
            fontSize: clueTextFontSizePixels,
            color: clueText.color,
            // @ts-expect-error textWrap not recognized by TS
            textWrap: "pretty",
          }}
        >
          {words.map(
            (word) =>
              word.horizontal === horizontal && (
                <div
                  key={word.word.answer}
                  style={{
                    marginBottom: "3px",
                  }}
                >
                  {word.number}.{" "}
                  {randomizeClues
                    ? loremIpsum({
                        p: 1,
                        avgSentencesPerParagraph: 1,
                        avgWordsPerSentence: 8,
                      })
                    : word.word.clue}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
