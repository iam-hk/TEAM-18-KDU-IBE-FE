import { configureStore } from "@reduxjs/toolkit";
import { CurrencyReducer } from "./CurrencySlice";
import { SearchRoomReducer } from "./SearchRoomSlice";
import { TenantReducer } from "./TenantConfigSlice";
import { PropertyNameReducer } from "./PropertyNameSlice";
import { PropertyConfigReducer } from "./PropertyConfigSlice";
import { StepperReducer } from "./StepperSlice";
import { FilterRoomReducer } from "./FilterRoomSlice";
export const store = configureStore({
  reducer: {
    currencyRate: CurrencyReducer,
    searchRoomInfo: SearchRoomReducer,
    tenantInfo: TenantReducer,
    propertyNameInfo: PropertyNameReducer,
    propertyConfigInfo: PropertyConfigReducer,
    stepper:StepperReducer,
    filterRoom:FilterRoomReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
