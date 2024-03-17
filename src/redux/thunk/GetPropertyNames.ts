import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPropertyResponse } from "../PropertyNameSlice";

export const getPropertyNames = createAsyncThunk<IPropertyResponse>(
  "getPropertyNames",
  async () => {
    const url=import.meta.env.VITE_REACT_APP_PROPERTY_NAME;
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      throw new Error("Wrong URL");
    }
  }
);
