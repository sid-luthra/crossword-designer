export type WordGrid = {
  wordPlacements: WordPlacement[];
  unplaced?: string[];
  letterPlacements?: LetterPlacement[];
  sizeX: number;
  sizeY: number;
  score?: number;
};

export type WordPlacement = {
  word: string;
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
  words: string[];
};

export type ScoringFactors = {
  wordCount: number;
  squareness: number;
  intersections: number;
  density: number;
};
