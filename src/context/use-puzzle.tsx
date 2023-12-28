import { useContext } from "react";
import { PuzzleContext } from "./puzzle-context";

const usePuzzle = () => useContext(PuzzleContext);

export default usePuzzle;
