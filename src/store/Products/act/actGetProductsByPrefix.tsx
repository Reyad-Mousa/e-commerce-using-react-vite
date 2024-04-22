import { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// First, create the thunk
const actGetProductsByPrefix = createAsyncThunk(
  "categories/actGetProductsByPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TProduct>(
        `/products?cat_prefix=${prefix}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message || error.message);
      } else {
        return rejectWithValue("Error: " + error);
      }
    }
  }
);

export default actGetProductsByPrefix;
