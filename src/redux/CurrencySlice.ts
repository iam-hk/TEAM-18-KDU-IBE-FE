import{PayloadAction, createSlice} from "@reduxjs/toolkit"
import { CurrencyExchangeRates } from "../types/CurrencyExchange"
import { CurrencyExchangeResponse } from "../types/CurrencyExchangeResponse"

interface CurrencyExchangeRateState{
   currentPrice:CurrencyExchangeRates,
   currentSelectedCurrency:string,
}

const initialState:CurrencyExchangeRateState={
    currentPrice:{} as CurrencyExchangeRates,
    currentSelectedCurrency:"USD"
}
const CurrencySlice=createSlice({
    name:"currencyRate",
    initialState,
    reducers:{
        addCurrencyExchangeRates:(state,action:PayloadAction<CurrencyExchangeResponse>)=>{
            state.currentPrice = action.payload.data;
        },
        changeCurrentCurrency:(state,action:PayloadAction<string>)=>{
            state.currentSelectedCurrency=action.payload;
        }
    },
})
export const{addCurrencyExchangeRates,changeCurrentCurrency}=CurrencySlice.actions;
export const CurrencyReducer=CurrencySlice.reducer;