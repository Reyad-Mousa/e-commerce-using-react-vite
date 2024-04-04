import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { TCategory } from "@customTypes/category";
import { TLoading } from "@customTypes/shared";

// Define a type for the slice state
interface CategoryState {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
}

// Define the initial state using that type
const initialState: CategoryState = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      } else if (Array.isArray(action.payload)) {
        state.records = action.payload;
      }
    });

    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload as string;
      }
    });
  },
});
export { actGetCategories };
export default categoriesSlice.reducer;
