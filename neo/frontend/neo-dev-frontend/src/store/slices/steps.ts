import { createSlice } from "@reduxjs/toolkit";

const stepsSlice = createSlice({
  name: "steps",
  initialState: [],
  reducers: {
    setSteps: (state, action) => {
      return action.payload;
    },
    clearSteps: () => {
      return [];
    },
  },
});

export const { setSteps, clearSteps } = stepsSlice.actions;
export default stepsSlice.reducer;
