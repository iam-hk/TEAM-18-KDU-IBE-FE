import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface IStepperSlice {
  isFulfilled: boolean[];
  currentState: number;
  timeLeft:number;
  isActive:boolean;
}
const initialState: IStepperSlice = {
  currentState: 0,
  isFulfilled: [false, false, false],
  timeLeft:600,
  isActive:false
};
const StepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    setTimeLeft:(state,action:PayloadAction<number>)=>{
      state.timeLeft=action.payload;
    },
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
    setBookingStatus:(state,action:PayloadAction<boolean>)=>{
      state.isActive=action.payload;
    }
  },
});
export const { increaseStepperState, decreaseStepperState, setStepperState,setTimeLeft,setBookingStatus } =
  StepperSlice.actions;
export const StepperReducer = StepperSlice.reducer;
