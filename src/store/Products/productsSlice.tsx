import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByPrefix from "./act/actGetProductsByPrefix";
import { TLoading } from "@customTypes/shared";
import { TProduct } from "@customTypes/product";

// Define a type for the slice state
interface productsSlice {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}

// Define the initial state using that type
const initialState: productsSlice = {
  records: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(actGetProductsByPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      } else if (Array.isArray(action.payload)) {
        state.records = action.payload;
      }
    });

    builder.addCase(actGetProductsByPrefix.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload as string;
      }
    });
  },
});

export { actGetProductsByPrefix };
export default productsSlice.reducer;
