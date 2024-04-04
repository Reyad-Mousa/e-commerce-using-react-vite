import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = { id: number; title: string; prefix: string; img: string }[];

// First, create the thunk
const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        "http://localhost:3000/categories"
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

export default actGetCategories;
