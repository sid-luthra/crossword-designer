import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import {
  Background,
  ClueDisplay,
  GridDisplay,
  PuzzleBoard,
  Title,
} from "../types/display-types";

interface PuzzleState {
  background: Background;
  puzzleBoard: PuzzleBoard;
  title: Title;
  gridDisplay: GridDisplay;
  clueDisplay: ClueDisplay;
}

const initialState: PuzzleState = {
  background: { width: 0, height: 0, type: "Grass" },
  puzzleBoard: {
    label: "4' x 6'",
    layout: "side-by-side",
    widthInches: 72,
    heightInches: 48,
    widthPixels: 0,
    heightPixels: 0,
    pixelsPerInch: 0,
    paddingInches: 1,
    paddingPixels: 0,
  },
  title: {
    heightPixels: 0,
    text: "Sip & Solve",
    color: "#ffffff",
    fontSize: 180,
    font: "cursive",
    marginBottomInches: 3,
    marginBottomPixels: 0,
  },
  gridDisplay: {
    percentWidth: 50,
    percentHeight: 100,
    widthPixels: 0,
    heightPixels: 0,
    boxSizeInches: 2,
    boxSizePixels: 0,
    boxMarginInches: 0.25,
    boxMarginPixels: 0,
    boxCountX: 0,
    boxCountY: 0,
    boxColor: "#ffffff",
    boxBorderColor: "#000000",
    boxBorderWidth: 0,
    marginRightInches: 1,
    marginRightPixels: 0,
    marginBottomInches: 1,
    marginBottomPixels: 0,
  },
  clueDisplay: {
    heading: {
      fontSize: 24,
      font: "sans-serif",
      color: "#ffffff",
    },
    clueText: {
      fontSize: 18,
      font: "sans-serif",
      color: "#ffffff",
    },
    randomizeClues: false,
    hideAnswers: false,
  },
};

export const puzzleSlice = createSlice({
  name: "puzzle",
  initialState,
  reducers: {
    setPuzzle: (state, action: PayloadAction<Partial<PuzzleState>>) => {
      return { ...state, ...action.payload };
    },
    setBackgroundDimsPixels: (
      state,
      action: PayloadAction<Omit<Background, "type">>
    ) => {
      state.background = { ...state.background, ...action.payload };
    },
    setBackgroundType: (state, action: PayloadAction<Background["type"]>) => {
      state.background.type = action.payload;
    },
    setPuzzleLayout: (state, action: PayloadAction<string>) => {
      state.puzzleBoard.layout = action.payload;
    },
    setPuzzleDimsInches: (
      state,
      action: PayloadAction<
        Pick<PuzzleBoard, "label" | "widthInches" | "heightInches">
      >
    ) => {
      state.puzzleBoard = { ...state.puzzleBoard, ...action.payload };
    },
    setPuzzleDimsPixels: (
      state,
      action: PayloadAction<
        Pick<PuzzleBoard, "widthPixels" | "heightPixels" | "pixelsPerInch">
      >
    ) => {
      state.puzzleBoard = { ...state.puzzleBoard, ...action.payload };
    },
    setPuzzlePadding: (
      state,
      action: PayloadAction<{ paddingInches: number; paddingPixels: number }>
    ) => {
      state.puzzleBoard = { ...state.puzzleBoard, ...action.payload };
    },
    setTitle: (state, action: PayloadAction<Partial<Title>>) => {
      state.title = { ...state.title, ...action.payload };
    },
    setGridDisplay: (state, action: PayloadAction<Partial<GridDisplay>>) => {
      state.gridDisplay = { ...state.gridDisplay, ...action.payload };
    },
    setClueDisplay: (state, action: PayloadAction<Partial<ClueDisplay>>) => {
      state.clueDisplay = { ...state.clueDisplay, ...action.payload };
    },
  },
});

export const {
  setPuzzle,
  setPuzzleLayout,
  setBackgroundDimsPixels,
  setBackgroundType,
  setPuzzleDimsInches,
  setPuzzleDimsPixels,
  setPuzzlePadding,
  setTitle,
  setGridDisplay,
  setClueDisplay,
} = puzzleSlice.actions;

export const selectPuzzle = (state: RootState) => state.puzzle;

export default puzzleSlice.reducer;
