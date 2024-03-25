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
      if (state.isFulfilled[action.payload] === false) {
        state.currentState += 1;
      } else {
        state.currentState += action.payload;
      }
    },
  },
});
export const StepperReducer = StepperSlice.reducer;
