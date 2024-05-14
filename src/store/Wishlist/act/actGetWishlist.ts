import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@customTypes/product.types";
import { RootState } from "@store/index";
import axiosErrorHandler from "@util/axiosErrorHandler";

type TDataType = "productsFullInfo" | "ProductIds";
type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`,
        { signal }
      );

      if (!userWishlist.data.length) {
        return { data: [], dataType: "empty" };
      }

      if (dataType === "ProductIds") {
        const concatenatedItemsIds = userWishlist.data.map(
          (el) => el.productId
        );
        return { data: concatenatedItemsIds, dataType: "ProductIds" };
      } else {
        const concatenatedItemsId = userWishlist.data
          .map((el) => `id=${el.productId}`)
          .join("&");

        const response = await axios.get<TResponse>(
          `/products?${concatenatedItemsId}`
        );
        return { data: response.data, dataType: "productsFullInfo" };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
