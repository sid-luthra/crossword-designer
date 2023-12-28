import { configureStore } from "@reduxjs/toolkit";
import puzzleSlice from "./puzzle-slice";
import gridSlice from "./grid-slice";

const store = configureStore({
  reducer: {
    puzzle: puzzleSlice,
    grid: gridSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
