import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface IFilterRoom {
  bedType: boolean;
  roomType: boolean;
  bedTypeOptions: string[];
  roomTypeOptions: string[];
  selectedSortingParam: string;
  selectedSortingOrder:boolean;
  pageNumber:number;
  responseReceived:boolean
}
const initialState: IFilterRoom = {
  bedType: false,
  roomType: false,
  bedTypeOptions: [],
  roomTypeOptions: [],
  selectedSortingParam:"Select",
  selectedSortingOrder:true,
  pageNumber:1,
  responseReceived:false
};
const FilterRoomSlice = createSlice({
  name: "filterRoom",
  initialState,
  reducers: {
    toggleBedTypeVisibility: (state) => {
      state.bedType = !state.bedType;
    },
    toggleRoomTypeVisibility: (state) => {
      state.roomType = !state.roomType;
    },
    setBedTypeVisibility: (state, action: PayloadAction<boolean>) => {
      state.bedType = action.payload;
    },
    setRoomTypeVisibility: (state, action: PayloadAction<boolean>) => {
      state.roomType = action.payload;
    },
    toggleBedType: (state, action) => {
      const option = action.payload;
      const index = state.bedTypeOptions.indexOf(option);
      if (index === -1) {
        state.bedTypeOptions.push(option);
      } else {
        state.bedTypeOptions.splice(index, 1);
      }
    },
    toggleRoomType: (state, action) => {
      const option = action.payload;
      const index = state.roomTypeOptions.indexOf(option);
      if (index === -1) {
        state.roomTypeOptions.push(option);
      } else {
        state.roomTypeOptions.splice(index, 1);
      }
    },
    changeSelectedSortingParam:(state,action:PayloadAction<string>)=>{
      state.selectedSortingParam=action.payload;
    },
    changePageNumber:(state,action:PayloadAction<number>)=>
    {
        state.pageNumber=action.payload;
    },
    setResponseReceived:(state,action:PayloadAction<boolean>)=>{
      state.responseReceived=action.payload;
    },
    changeSortingTechnique:(state,action:PayloadAction<boolean>)=>{
      state.selectedSortingOrder = action.payload;
      console.log(state.selectedSortingParam + state.selectedSortingOrder)
    }
  },
});
export const {
  toggleBedTypeVisibility,
  toggleRoomTypeVisibility,
  toggleBedType,
  toggleRoomType,
  setRoomTypeVisibility,
  setBedTypeVisibility,
  changeSelectedSortingParam,
  changePageNumber,
  changeSortingTechnique,
  setResponseReceived
} = FilterRoomSlice.actions;
export const FilterRoomReducer = FilterRoomSlice.reducer;
