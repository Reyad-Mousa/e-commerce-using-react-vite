import { useEffect } from "react";
import {
  actGetProductsByPrefix,
  productsCleanUp,
} from "@store/Products/productsSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useParams } from "react-router-dom";

const useProducts = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const { loading, records, error } = useAppSelector(
    (state) => state.productsSlice
  );

  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  const cartItems = useAppSelector((state) => state.cartSlice.items);
  const wishListItemsId = useAppSelector(
    (state) => state.WishlistSlices.itemsId
  );
  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id as number] || 0,
    isLiked: wishListItemsId.includes(el.id),
    isAccessToken: userAccessToken ? true : false,
  }));

  useEffect(() => {
    // let prefix: string; (1
    // if (params.prefix && typeof params.prefix === "string") {  2
    //   prefix = params.prefix;3
    // dispatch(actGetProductsByPrefix(prefix));} 4) ===
    const promise = dispatch(actGetProductsByPrefix(params.prefix as string));
    return () => {
      promise.abort();
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);

  return { loading, error, productsFullInfo, userAccessToken };
};

export default useProducts;
