import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "@customTypes/product.types";
import actGetProductsByItems from "./act/actGetProductItems";
import { isString } from "@customTypes/guards";
import { TLoading } from "@customTypes/shared.types";
interface ICartState {
  items: { [key: string]: number };
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    cartItemsChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    cartItemRemove: (state, action) => {
      delete state.items[action.payload];
      state.productsFullInfo = state.productsFullInfo.filter(
        (el) => el.id !== action.payload
      );
    },
    cleanCartProductsFullInfo: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload as string;
      }
    });
  },
});
export { actGetProductsByItems };
export const {
  addToCart,
  cartItemsChangeQuantity,
  cartItemRemove,
  cleanCartProductsFullInfo,
} = cartSlice.actions;
export default cartSlice.reducer;
