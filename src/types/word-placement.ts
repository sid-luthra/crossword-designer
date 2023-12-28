export type WordGrid = {
  wordPlacements: WordPlacement[];
  unplaced?: Word[];
  letterPlacements?: LetterPlacement[];
  sizeX: number;
  sizeY: number;
  score?: number;
};

export type Word = {
  clue: string;
  answer: string;
};

export type WordPlacement = {
  word: Word;
  x: number;
  y: number;
  horizontal: boolean;
  number?: number;
};

export type LetterPlacement = {
  letter: string;
  x: number;
  y: number;
  number?: number;
};

export type ScoringFactors = {
  wordCount: number;
  squareness: number;
  intersections: number;
  density: number;
};
