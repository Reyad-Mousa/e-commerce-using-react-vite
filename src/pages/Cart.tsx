import { CartItemList, CartSubTotalPrice } from "@components/eCommerce";
import { useCallback, useEffect } from "react";
import {
  actGetProductsByItems,
  cartItemRemove,
  cartItemsChangeQuantity,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import Loading from "@components/feedback/Loading";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cartSlice
  );
  useEffect(() => {
    dispatch(actGetProductsByItems());
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
  return (
    <Loading status={loading} error={error}>
      {products.length ? (
        <>
          <CartItemList
            products={products}
            changeQuantityHandler={changeQuantityHandler}
            removeItemHandler={removeItemHandler}
          />
          <CartSubTotalPrice products={products} />
        </>
      ) : (
        <p className=" text-center fw-bold">"Your Cart Is Empty"</p>
      )}
    </Loading>
  );
};

export default Cart;
