import "./App.css";
import GridDisplay from "./features/grid-display/grid-display";
import sampleWords from "./data/sample-words";
import { useState } from "react";
import useGrid from "./hooks/use-grid";

function App() {
  const [sizeX, setSizeX] = useState(25);
  const [sizeY, setSizeY] = useState(25);
  const [words, setWords] = useState<string[]>(sampleWords);
  const [iterations, setIterations] = useState(25);

  const { attempts, grid, generateGrid, loading } = useGrid();

  return (
    <div>
      <div className="grid-container">
        <GridDisplay grid={grid} />
      </div>
      <div className="control-container">
        <div className="input-container">
          <label htmlFor="sizeX">Size X</label>
          <input
            id="sizeX"
            type="number"
            value={sizeX}
            onChange={(e) => setSizeX(Number(e.target.value))}
          />
        </div>
        <div className="input-container">
          <label htmlFor="sizeY">Size Y</label>
          <input
            id="sizeY"
            type="number"
            value={sizeY}
            onChange={(e) => setSizeY(Number(e.target.value))}
          />
        </div>
        <div className="input-container">
          <label htmlFor="iterations">Iterations</label>
          <input
            id="iterations"
            type="number"
            value={iterations}
            onChange={(e) => setIterations(Number(e.target.value))}
          />
        </div>
        <label htmlFor="words">Word List</label>
        <textarea
          id="words"
          className="input-text-area"
          rows={20}
          value={words.join("\n")}
          onChange={(e) => setWords(e.target.value.split("\n"))}
        />
        <button
          type="button"
          onClick={() => {
            generateGrid({ sizeX, sizeY, words, iterations });
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Generate"}
        </button>
        <div>
          <h2>Attempts: {attempts}</h2>
          <h2>Score: {grid?.score}</h2>
          <h2>Placed: {grid?.wordPlacements.length}</h2>
          <h2>Unplaced: {grid?.unplaced?.length}</h2>
        </div>
        <div className="input-container">
          <label htmlFor="sizeX">Size X</label>
          <input
            id="sizeX"
            type="number"
            value={sizeX}
            onChange={(e) => setSizeX(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
