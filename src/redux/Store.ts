import { configureStore } from "@reduxjs/toolkit";
import { CurrencyReducer } from "./CurrencySlice";
import { SearchReducer } from "./SearchSlice";
import { TenantReducer } from "./TenantConfigSlice";
export const store = configureStore({
  reducer: {
    currencyRate: CurrencyReducer,
    searchInfo:SearchReducer,
    tenantInfo:TenantReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
