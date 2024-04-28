import { CartItemList, CartSubTotalPrice } from "@components/eCommerce";
import Loading from "@components/feedback/Loading";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import useCart from "@hooks/useCart";

const Cart = () => {
  const { loading, error, products, changeQuantityHandler, removeItemHandler } =
    useCart();
  return (
    <Loading status={loading} error={error} type="cart">
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
        <LottieHandler type="empty" message="Your Cart Is Empty" />
      )}
    </Loading>
  );
};

export default Cart;
