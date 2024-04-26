import actGetWishlist from "@store/Wishlist/act/actGetWishlist";
import { cleanWishlistProductsFullInfo } from "@store/Wishlist/WishlistSlices";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { loading, error, productsFullInfo } = useAppSelector(
    (state) => state.WishlistSlices
  );
  const cartItems = useAppSelector((state) => state.cartSlice.items);

  useEffect(() => {
    const promise = dispatch(actGetWishlist());
    return () => {
      promise.abort();
      dispatch(cleanWishlistProductsFullInfo());
    };
  }, [dispatch]);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: true,
  }));

  return { loading, error, records };
};

export default useWishlist;
