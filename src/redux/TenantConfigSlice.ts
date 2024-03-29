import { createSlice } from "@reduxjs/toolkit";
import { getTenantConfig } from "./thunk/GetTenantConfig";
interface ITenantConfigState {
  maximumDays: number;
  maixmumGuests: number;
  maximumRooms: number;
  headerLogo: string;
  title: string;
  bannerImage: string;
  taxes: number;
  percentPayableAtHotel: number;
  state: string;
  errorMessage: string;
}
const initialState: ITenantConfigState = {
  maximumDays: 0,
  maixmumGuests: 0,
  maximumRooms: 1,
  headerLogo: "",
  title: "",
  bannerImage: "",
  taxes: 0.0,
  percentPayableAtHotel: 0.0,
  state: "pending",
  errorMessage: "",
};
const TenantConfigSlice = createSlice({
  name: "tenantInfo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTenantConfig.pending, (state) => {
        state.state = "pending";
      })
      .addCase(getTenantConfig.fulfilled, (state, action) => {
        state.maximumDays = action.payload.maximumDays;
        state.maixmumGuests = action.payload.maixmumGuests;
        state.maximumRooms = action.payload.maximumRooms;
        state.headerLogo = action.payload.headerLogo;
        state.title = action.payload.title;
        state.bannerImage = action.payload.bannerImage;
        state.taxes = action.payload.taxes;
        state.percentPayableAtHotel = action.payload.percentPayableAtHotel;
        state.state = "fulfilled";
      })
      .addCase(getTenantConfig.rejected, (state, action) => {
        state.errorMessage = action.error.message!;
        state.state = "rejected";
      });
  },
});

export const TenantReducer = TenantConfigSlice.reducer;
