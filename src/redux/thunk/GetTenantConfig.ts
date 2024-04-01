import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTenantConfig = createAsyncThunk("getTenantConfig", async () => {
  const url = import.meta.env.VITE_REACT_APP_CONFIGURATION;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("Wrong URL");
  }
});
