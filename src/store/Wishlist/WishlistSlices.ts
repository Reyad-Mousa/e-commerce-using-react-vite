import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishlist from "./act/actGetWishlist";
import { TProduct } from "@customTypes/product.types";
import { isString } from "@customTypes/guards";
import { TLoading } from "@customTypes/shared.types";
import { userLogOut } from "@store/auth/authSlice";

interface IWishlist {
  itemsId: number[];
  productsFullInfo: TProduct[];
  error: null | string;
  loading: TLoading;
}

const initialState: IWishlist = {
  itemsId: [],
  productsFullInfo: [],
  error: null,
  loading: "idle",
};

const wishList = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    cleanWishlistProductsFullInfo: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
        state.productsFullInfo = state.productsFullInfo.filter(
          (el) => el.id !== action.payload.id
        );
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // get wishlist items
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload.dataType === "productsFullInfo") {
        state.productsFullInfo = action.payload.data as TProduct[];
      } else if (action.payload.dataType === "ProductIds") {
        state.itemsId = action.payload.data as number[];
      }
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    // when logout reset
    builder.addCase(userLogOut, (state) => {
      state.itemsId = [];
      state.productsFullInfo = [];
    });
  },
});

export { actLikeToggle, actGetWishlist };
export const { cleanWishlistProductsFullInfo } = wishList.actions;
export default wishList.reducer;
