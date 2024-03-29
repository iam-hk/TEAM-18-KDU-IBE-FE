import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface IStepperSlice {
  isFulfilled: boolean[];
  currentState: number;
}
const initialState: IStepperSlice = {
  currentState: 0,
  isFulfilled: [false, false, false],
};
const StepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    increaseStepperState: (state, action: PayloadAction<number>) => {
      state.currentState = action.payload;
    },
    decreaseStepperState: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0) {
        state.currentState = action.payload;
      }
    },
    setStepperState: (state, action: PayloadAction<number>) => {
      state.currentState = action.payload;
    },
  },
});
export const { increaseStepperState, decreaseStepperState, setStepperState } =
  StepperSlice.actions;
export const StepperReducer = StepperSlice.reducer;
