import { configureStore } from "@reduxjs/toolkit";
import { CurrencyReducer } from "./CurrencySlice";
import { SearchRoomReducer } from "./SearchRoomSlice";
import { TenantReducer } from "./TenantConfigSlice";
import { PropertyNameReducer } from "./PropertyNameSlice";
import { PropertyConfigReducer } from "./PropertyConfigSlice";
import { StepperReducer } from "./StepperSlice";
import { FilterRoomReducer } from "./FilterRoomSlice";

import { combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  currencyRate: CurrencyReducer,
  searchRoomInfo: SearchRoomReducer,
  tenantInfo: TenantReducer,
  propertyNameInfo: PropertyNameReducer,
  propertyConfigInfo: PropertyConfigReducer,
  stepper: StepperReducer,
  filterRoom: FilterRoomReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
