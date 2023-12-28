import {
  LetterPlacement,
  ScoringFactors,
  Word,
  WordGrid,
  WordPlacement,
} from "../types/word-placement";

export function shuffleWords(words: Word[]): Word[] {
  return words.sort(() => Math.random() - 0.5);
}

interface CreateGridProps {
  words: Word[];
  sizeX?: number;
  sizeY?: number;
  options?: {
    maxAttempts?: number;
  };
}

export function createGrid({
  words,
  sizeX = 25,
  sizeY = 25,
}: CreateGridProps): WordGrid {
  const grid: WordGrid = {
    sizeX,
    sizeY,
    wordPlacements: [],
  };
  const shuffledWords = shuffleWords(words);
  const firstWord = shuffledWords[0];
  const firstHorizontalPlacement: WordPlacement = {
    word: firstWord,
    x: 0,
    y: 0,
    horizontal: true,
  };
  grid.wordPlacements.push(firstHorizontalPlacement);

  let remainingWords = shuffledWords.slice(1);

  const placeWords = () => {
    remainingWords.forEach((word) => {
      const possiblePlacements = findPossiblePlacements(word, grid);
      if (possiblePlacements.length > 0) {
        const placement = getOptimalPlacement(possiblePlacements, grid);
        grid.wordPlacements.push(placement);
        remainingWords = remainingWords.filter((w) => w !== word);
      }
    });
  };

  for (let i = 0; i < 3; i++) {
    if (remainingWords.length === 0) {
      break;
    }
    placeWords();
  }

  grid.unplaced = remainingWords;
  grid.letterPlacements = getGridLetterPlacements(grid.wordPlacements);

  return grid;
}

function findPossiblePlacements(word: Word, grid: WordGrid) {
  const possiblePlacements: WordPlacement[] = [];

  const letters = word.answer.split("");
  const gridLetters = getGridLetterPlacements(grid.wordPlacements);

  letters.forEach((letter, index) => {
    const matchingGridLetters = gridLetters.filter(
      (gridLetter) => gridLetter.letter === letter
    );
    matchingGridLetters.forEach((gridLetter) => {
      const verticalPlacement = {
        word,
        x: gridLetter.x,
        y: gridLetter.y - index,
        horizontal: false,
      };
      if (checkValidPlacement(verticalPlacement, grid)) {
        possiblePlacements.push(verticalPlacement);
      }
      const horizontalPlacement = {
        word,
        x: gridLetter.x - index,
        y: gridLetter.y,
        horizontal: true,
      };
      if (checkValidPlacement(horizontalPlacement, grid)) {
        possiblePlacements.push(horizontalPlacement);
      }
    });
  });

  return possiblePlacements;
}

function checkValidPlacement(newPlacement: WordPlacement, grid: WordGrid) {
  const { wordPlacements, sizeX, sizeY } = grid;

  const hasConflicts = checkHasConflicts(newPlacement, wordPlacements);
  const hasMultipleIntersections = checkHasMultipleIntersections(
    newPlacement,
    wordPlacements
  );
  const invalidStart = checkInvalidStart(newPlacement, wordPlacements);
  const invalidEnd = checkInvalidEnd(newPlacement, wordPlacements);
  const hasWhitespaceIssues = checkHasWhitespaceIssues(
    newPlacement,
    wordPlacements
  );
  const isOutOfBounds = checkOutOfBounds(newPlacement, sizeX, sizeY);
  return (
    !hasConflicts &&
    !hasWhitespaceIssues &&
    !isOutOfBounds &&
    !hasMultipleIntersections &&
    !invalidStart &&
    !invalidEnd
  );
}

function checkHasConflicts(newPlacement: WordPlacement, grid: WordPlacement[]) {
  const wordLetters = getWordLetterPlacements(newPlacement);
  const conflicts = wordLetters.filter((letter) => {
    const match = getGridLetterAtCoords(letter.x, letter.y, grid);
    if (!match) {
      return false;
    }
    if (match.letter !== letter.letter) {
      return true;
    }
    return false;
  });
  return conflicts.length > 0;
}

function checkHasMultipleIntersections(
  newPlacement: WordPlacement,
  grid: WordPlacement[]
) {
  const multiIntersections = [];
  grid.forEach((gridPlacement) => {
    const intersections = [];
    const wordLetters = getWordLetterPlacements(newPlacement);
    const gridLetters = getWordLetterPlacements(gridPlacement);
    wordLetters.filter((wordLetter) => {
      const match = gridLetters.find((gridLetter) => {
        return gridLetter.x === wordLetter.x && gridLetter.y === wordLetter.y;
      });
      if (match) {
        intersections.push(match);
      }
    });
    if (intersections.length > 1) {
      multiIntersections.push(gridPlacement);
    }
  });
  return multiIntersections.length > 0;
}

function checkOutOfBounds(
  placement: WordPlacement,
  sizeX: number,
  sizeY: number
) {
  const wordLetters = getWordLetterPlacements(placement);
  const outOfBounds = wordLetters.filter((letter) => {
    return (
      letter.x < 0 || letter.x >= sizeX || letter.y < 0 || letter.y >= sizeY
    );
  });
  return outOfBounds.length > 0;
}

function checkInvalidStart(placement: WordPlacement, grid: WordPlacement[]) {
  const start = getWordLetterPlacements(placement)[0];
  const adjacentLetters = getAdjacentLetters(start, grid);
  if (placement.horizontal) {
    if (adjacentLetters.left !== undefined) {
      return true;
    }
  } else if (adjacentLetters.top !== undefined) {
    return true;
  }
  return false;
}

function checkInvalidEnd(placement: WordPlacement, grid: WordPlacement[]) {
  const letters = getWordLetterPlacements(placement);
  const length = letters.length;
  const end = letters[length - 1];
  const adjacentLetters = getAdjacentLetters(end, grid);
  if (placement.horizontal) {
    if (adjacentLetters.right !== undefined) {
      return true;
    }
  } else if (adjacentLetters.bottom !== undefined) {
    return true;
  }
  return false;
}

function checkHasWhitespaceIssues(
  placement: WordPlacement,
  grid: WordPlacement[]
) {
  const wordLetters = getWordLetterPlacements(placement);
  const length = wordLetters.length;

  const whitespaceIssues = wordLetters.filter((letter, index) => {
    const match = getGridLetterAtCoords(letter.x, letter.y, grid);
    if (match) {
      return false;
    }
    const adjacentLetters = getAdjacentLetters(letter, grid);
    const isFirstLetter = index === 0;
    if (isFirstLetter) {
      if (placement.horizontal) {
        if (adjacentLetters.left !== undefined) {
          return true;
        }
      } else if (adjacentLetters.top !== undefined) {
        return true;
      }
    }
    const isLastLetter = index === length - 1;
    if (isLastLetter) {
      if (placement.horizontal) {
        if (adjacentLetters.right !== undefined) {
          return true;
        }
      } else if (adjacentLetters.bottom !== undefined) {
        return true;
      }
    }
    const hasAdjacentLetters = placement.horizontal
      ? adjacentLetters.top !== undefined ||
        adjacentLetters.bottom !== undefined
      : adjacentLetters.left !== undefined ||
        adjacentLetters.right !== undefined;
    if (hasAdjacentLetters) {
      return true;
    }
    return false;
  });
  return whitespaceIssues.length > 0;
}

function getAdjacentLetters(letter: LetterPlacement, grid: WordPlacement[]) {
  const adjacentLetters = {
    left: getGridLetterAtCoords(letter.x - 1, letter.y, grid),
    right: getGridLetterAtCoords(letter.x + 1, letter.y, grid),
    top: getGridLetterAtCoords(letter.x, letter.y - 1, grid),
    bottom: getGridLetterAtCoords(letter.x, letter.y + 1, grid),
  };
  return adjacentLetters;
}

function getGridLetterAtCoords(x: number, y: number, grid: WordPlacement[]) {
  const gridLetters = getGridLetterPlacements(grid);
  const match = gridLetters.find((gridLetter) => {
    return gridLetter.x === x && gridLetter.y === y;
  });
  return match;
}

export function getWordLetterPlacements(
  placement: WordPlacement
): LetterPlacement[] {
  const letterPlacements: LetterPlacement[] = [];
  const { word, x, y, horizontal } = placement;
  const letters = word.answer.split("");
  letters.forEach((letter, index) => {
    const letterPlacement: LetterPlacement = {
      letter,
      x: horizontal ? x + index : x,
      y: horizontal ? y : y + index,
    };
    letterPlacements.push(letterPlacement);
  });
  return letterPlacements;
}

export function getGridLetterPlacements(
  grid: WordPlacement[]
): LetterPlacement[] {
  const letterPlacements: LetterPlacement[] = [];
  grid.forEach((placement) => {
    const letters = getWordLetterPlacements(placement);
    if (placement.number) {
      letters[0].number = placement.number;
    }
    letterPlacements.push(...letters);
  });
  return letterPlacements;
}

function getOptimalPlacement(options: WordPlacement[], grid: WordGrid) {
  const { wordPlacements, sizeX, sizeY } = grid;
  const densities = options.map((option) => {
    const newGrid = [...wordPlacements, option];
    const density = getGridDensity({ wordPlacements: newGrid, sizeX, sizeY });
    return density;
  });
  const minDensity = Math.min(...densities);
  const minDensityIndex = densities.findIndex(
    (density) => density === minDensity
  );
  const optimalPlacement = options[minDensityIndex];
  return optimalPlacement;
}

function scoreGrid(grid: WordGrid) {
  const scoring: ScoringFactors = {
    wordCount: 100,
    squareness: 500,
    intersections: 50,
    density: 25,
  };

  const totalScore = Object.values(scoring).reduce((total, value) => {
    return total + value;
  }, 0);

  if (!grid.letterPlacements) {
    return 0;
  }

  const gridCount = grid.wordPlacements.length;
  const squareness = getSquareness(grid);
  const intersections = countIntersections(grid);
  const density = getGridDensity(grid);

  const score =
    Math.round(
      ((gridCount * scoring.wordCount +
        squareness * scoring.squareness +
        intersections * scoring.intersections +
        density * scoring.density) /
        totalScore) *
        100
    ) / 100;

  return score;
}

export function compareGrids(oldGrid: WordGrid, newGrid: WordGrid): WordGrid {
  const newScore = scoreGrid(newGrid);
  const oldScore = scoreGrid(oldGrid);

  if (newScore > oldScore) {
    return { ...newGrid, score: newScore };
  }
  return { ...oldGrid, score: oldScore };
}

function getGridDensity(grid: WordGrid) {
  const { wordPlacements, sizeX, sizeY } = grid;
  const gridLetters = getGridLetterPlacements(wordPlacements);
  const gridLetterCount = getUniqueLetterPositions(gridLetters).length;
  const density = gridLetterCount / (sizeX * sizeY);
  return density;
}

function getSquareness(grid: WordGrid) {
  const minX = Math.min(...grid.wordPlacements.map((p) => p.x));
  const maxX = Math.max(...grid.wordPlacements.map((p) => p.x));
  const minY = Math.min(...grid.wordPlacements.map((p) => p.y));
  const maxY = Math.max(...grid.wordPlacements.map((p) => p.y));
  const width = maxX - minX;
  const height = maxY - minY;
  const squareness = Math.abs(width / height - 1);
  return 1 - squareness;
}

function countIntersections(grid: WordGrid): number {
  const letterPlacements = grid.letterPlacements || [];
  const seenPositions = new Set<string>();
  let intersectionCount = 0;

  letterPlacements.forEach((placement: LetterPlacement) => {
    const positionKey = `${placement.x}-${placement.y}`;

    if (seenPositions.has(positionKey)) {
      intersectionCount++;
    } else {
      seenPositions.add(positionKey);
    }
  });

  return intersectionCount;
}

function getUniqueLetterPositions(
  letterPlacements: LetterPlacement[]
): LetterPlacement[] {
  const uniqueLetters: LetterPlacement[] = letterPlacements.reduce(
    (unique: LetterPlacement[], current: LetterPlacement) => {
      const match = unique.find((letter) => {
        return letter.x === current.x && letter.y === current.y;
      });
      if (!match) {
        return [...unique, current];
      }
      if (current.number) {
        const index = unique.findIndex((letter) => letter === match);
        if (index !== -1) {
          unique[index] = {
            ...match,
            number: current.number,
          };
        }
      } else {
        const index = unique.findIndex((letter) => letter === match);
        if (index !== -1) {
          unique[index] = {
            ...match,
          };
        }
      }
      return unique;
    },
    []
  );
  return uniqueLetters;
}

export function getGridNumbers(grid: WordGrid) {
  const unsorted = [...grid.wordPlacements];
  const sortedGrid = unsorted.sort((a, b) => {
    if (a.y === b.y) {
      return a.x - b.x;
    }
    return a.y - b.y;
  });
  let prevNumber = 0;
  const gridNumbers = sortedGrid.map((placement, index) => {
    if (
      placement.x === sortedGrid[index - 1]?.x &&
      placement.y === sortedGrid[index - 1]?.y
    ) {
      const number = prevNumber;
      return { ...placement, number };
    }
    const newNumber = prevNumber + 1;
    prevNumber = newNumber;
    return { ...placement, number: newNumber };
  });
  const gridLetterNumbers = getUniqueLetterPositions(
    getGridLetterPlacements(gridNumbers)
  );
  return {
    ...grid,
    wordPlacements: gridNumbers,
    letterPlacements: gridLetterNumbers,
  };
}
