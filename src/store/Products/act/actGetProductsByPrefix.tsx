import { TProduct } from "@customTypes/product.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";

// First, create the thunk
const actGetProductsByPrefix = createAsyncThunk(
  "categories/actGetProductsByPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await axios.get<TProduct>(
        `/products?cat_prefix=${prefix}`,
        {
          signal,
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByPrefix;
