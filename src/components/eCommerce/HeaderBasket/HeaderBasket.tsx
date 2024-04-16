import Logo from "@assets/svg/cart.svg?react";
import { useAppSelector } from "@store/hooks";
import styles from "./styles.module.css";
import { getCartTotalQuantitySelector } from "@store/cart/selector";

const { basketContainer, basketQuantity } = styles;

const HeaderBasket = () => {
  const cartItems = useAppSelector(getCartTotalQuantitySelector);

  return (
    <div className={basketContainer}>
      <Logo title="basket icon" />
      <div className={basketQuantity}>{cartItems}</div>
    </div>
  );
};

export default HeaderBasket;
