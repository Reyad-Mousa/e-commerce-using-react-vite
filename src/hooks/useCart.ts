import { useCallback, useEffect } from "react";
import {
  actGetProductsByItems,
  cartItemRemove,
  cartItemsChangeQuantity,
  cleanCartProductsFullInfo,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cartSlice
  );
  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());
    return () => {
      promise.abort();
      dispatch(cleanCartProductsFullInfo());
    };
  }, [dispatch]);

  const products = productsFullInfo.map((product) => ({
    ...product,
    quantity: items[product?.id],
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemsChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );

  return { loading, error, products, changeQuantityHandler, removeItemHandler };
};

export default useCart;
