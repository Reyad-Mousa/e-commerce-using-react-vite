import { useEffect } from "react";

import { Product } from "@components/eCommerce";
import { TProduct } from "@customTypes/product";
import { productsCleanUp } from "@store/Products/productsSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import Loading from "@components/feedback/Loading";
import GridList from "@components/common/GridList/GridList";
import actGetWishlist from "@store/Wishlist/act/actGetWishlist";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { loading, error, productsFullInfo } = useAppSelector(
    (state) => state.WishlistSlices
  );
  const cartItems = useAppSelector((state) => state.cartSlice.items);

  useEffect(() => {
    dispatch(actGetWishlist());
    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch]);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: true,
  }));

  return (
    <>
      <h1>Your Wishlist</h1>
      <Loading status={loading} error={error}>
        <GridList<TProduct>
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;
