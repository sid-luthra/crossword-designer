import { useState } from "react";
import GridBox from "../../components/grid-box/grid-box";
import { WordGrid } from "../../types/word-placement";
import "./grid-display.css";
import ClueDisplay from "./clue-display";

interface GridDisplayProps {
  grid: WordGrid;
}

export default function GridDisplay({ grid }: GridDisplayProps) {
  const [activeWords, setActiveWords] = useState<string[]>([""]);

  const { sizeX, sizeY, letterPlacements } = grid;

  const columns = Array.from({ length: sizeX }, (_, i) => i);
  const rows = Array.from({ length: sizeY }, (_, i) => i);

  return (
    <div className="grid-display-container">
      <div className="grid-display">
        <h1
          style={{
            textAlign: "center",
            fontSize: "3rem",
            fontFamily: "cursive",
          }}
        >
          Sip & Solve
        </h1>
        {rows.map((row) => (
          <div key={row} className="grid-row">
            {columns.map((column) => (
              <GridBox
                key={`x${row}-y${column}`}
                activeWords={activeWords}
                onHoverLetter={(words) => setActiveWords(words)}
                data={letterPlacements?.find(
                  (letterPlacement) =>
                    letterPlacement.x === column && letterPlacement.y === row
                )}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="clue-container">
        <ClueDisplay
          title="Across"
          words={grid.wordPlacements}
          horizontal={true}
          onHoverWord={(word) => setActiveWords([word])}
        />
        <ClueDisplay
          title="Down"
          words={grid.wordPlacements}
          horizontal={false}
          onHoverWord={(word) => setActiveWords([word])}
        />
      </div>
    </div>
  );
}
