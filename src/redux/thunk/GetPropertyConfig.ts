import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPropertyConfig = createAsyncThunk(
  "getPropertyConfig",
  async () => {
    const url = import.meta.env.VITE_REACT_APP_PROPERTY_CONFIGURATION;
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      throw new Error("Wrong URL");
    }
  }
);
