import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPropertyConfig=createAsyncThunk(
    "getPropertyConfig",async()=>{
        try{
            const res=await fetch("http://localhost:8000/api/v1/configure/property/18");
            const data=await res.json();
            console.log(data,"propertyconfig")
            return data
        }
        catch(err){
            throw new Error("Wrong URL");
        }
    }
)
