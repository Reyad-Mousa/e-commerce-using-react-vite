import { CartItemList, CartSubTotalPrice } from "@components/eCommerce";
import Loading from "@components/feedback/Loading";
import useCart from "@hooks/useCart";

const Cart = () => {
  const { loading, error, products, changeQuantityHandler, removeItemHandler } =
    useCart();
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
