import { configureStore } from "@reduxjs/toolkit";
import { CurrencyReducer } from "./CurrencySlice";
import { SearchRoomReducer } from "./SearchRoomSlice";
import { TenantReducer } from "./TenantConfigSlice";
import { PropertyNameReducer } from "./PropertyNameSlice";
import { PropertyConfigReducer } from "./PropertyConfigSlice";
export const store = configureStore({
  reducer: {
    currencyRate: CurrencyReducer,
    searchRoomInfo: SearchRoomReducer,
    tenantInfo: TenantReducer,
    propertyNameInfo: PropertyNameReducer,
    propertyConfigInfo: PropertyConfigReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
