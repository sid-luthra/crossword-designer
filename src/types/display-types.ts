export type Background = {
  type: string;
  width: number;
  height: number;
};

export type PuzzleBoard = {
  label: string;
  layout: string;
  widthInches: number;
  heightInches: number;
  widthPixels: number;
  heightPixels: number;
  pixelsPerInch: number;
  paddingInches: number;
  paddingPixels: number;
};

export type Title = {
  heightPixels: number;
  text: string;
  color: string;
  fontSize: number;
  font: string;
  marginBottomInches: number;
  marginBottomPixels: number;
};

export type GridDisplay = {
  percentWidth: number;
  percentHeight: number;
  widthPixels: number;
  heightPixels: number;
  boxSizeInches: number;
  boxSizePixels: number;
  boxMarginInches: number;
  boxMarginPixels: number;
  boxCountX: number;
  boxCountY: number;
  boxColor: string;
  boxBorderColor: string;
  boxBorderWidth: number;
  marginRightInches: number;
  marginRightPixels: number;
  marginBottomInches: number;
  marginBottomPixels: number;
};

export type ClueDisplay = {
  heading: {
    fontSize: number;
    font: string;
    color: string;
  };
  clueText: {
    fontSize: number;
    font: string;
    color: string;
  };
  randomizeClues: boolean;
  hideAnswers: boolean;
};
