import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICountry, ICity, IState, Country } from "country-state-city";
export interface IMyBookings{
    endDate:string,
    id:string,
    imageUrl:string,
    roomType:string,
    startDate:string,
    status:boolean,
    totalCost:number;
}
const initialState: {myBookings: IMyBookings[];} = {
    myBookings: []
};
const MyBookingsSlice =createSlice({
  name: "myBookings",
  initialState,
  reducers: {
    setMyBookings:(state,action:PayloadAction<IMyBookings[]>)=>
    {
        state.myBookings=action.payload;
        console.log(state.myBookings);
    }
  },
});
export const {
 setMyBookings
} = MyBookingsSlice.actions;
export const MyBookingsReducer = MyBookingsSlice.reducer;
