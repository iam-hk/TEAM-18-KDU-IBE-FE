import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTenantConfig=createAsyncThunk(
    "getTenantConfig",async()=>{
        try{
            const res=await fetch("http://localhost:8000/api/v1/configure/102");
            const data=await res.json();
            console.log(data)
            return data
        }
        catch(err){
            throw new Error("Wrong URL");
        }
    }
)