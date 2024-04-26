import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByPrefix from "./act/actGetProductsByPrefix";
import { TProduct } from "@customTypes/product.types";
import { isString } from "@customTypes/guards";
import { TLoading } from "@customTypes/shared.types";

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
  reducers: {
    productsCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(actGetProductsByPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (isString(action.payload)) {
        state.error = action.payload;
      } else if (Array.isArray(action.payload)) {
        state.records = action.payload;
      }
    });

    builder.addCase(actGetProductsByPrefix.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload as string;
      }
    });
  },
});

export const { productsCleanUp } = productsSlice.actions;
export { actGetProductsByPrefix };
export default productsSlice.reducer;
