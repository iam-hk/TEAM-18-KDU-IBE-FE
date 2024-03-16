import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPropertyResponse } from "../PropertyNameSlice";

export const getPropertyNames=createAsyncThunk<IPropertyResponse>(
    "getPropertyNames",async()=>{
        try{
            const res=await fetch("http://localhost:8000/api/v1/getAllProperties");
            const data=await res.json();
            console.log("all properties",data);
            return data
        }
        catch(err){
            throw new Error("Wrong URL");
        }
    }
)