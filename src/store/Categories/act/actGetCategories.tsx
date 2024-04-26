import { TCategory } from "@customTypes/category.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";

// First, create the thunk
const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await axios.get<TCategory>("/categories", { signal });
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetCategories;
