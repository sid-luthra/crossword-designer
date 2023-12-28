import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WordGrid } from "../types/word-placement";

interface GridState {
  grid: WordGrid;
  attempts: number;
  loading: boolean;
}

const initialGridState: GridState = {
  grid: {
    wordPlacements: [],
    sizeX: 0,
    sizeY: 0,
    score: 0,
  },
  attempts: 0,
  loading: false,
};

export const gridSlice = createSlice({
  name: "grid",
  initialState: initialGridState,
  reducers: {
    setGrid: (state, action: PayloadAction<WordGrid>) => {
      state.grid = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    incrementAttempts: (state) => {
      state.attempts++;
    },
    resetGrid: (state) => {
      state.grid = initialGridState.grid;
      state.attempts = 0;
    },
  },
});

export const { setGrid, incrementAttempts, setLoading, resetGrid } =
  gridSlice.actions;

export const selectGrid = (state: { grid: GridState }) => state.grid.grid;

export default gridSlice.reducer;
