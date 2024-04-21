import Logo from "@assets/svg/cart.svg?react";
import { useAppSelector } from "@store/hooks";
import styles from "./styles.module.css";
import { getCartTotalQuantitySelector } from "@store/cart/selector";
import { useNavigate } from "react-router-dom";
const { basketContainer, basketQuantity } = styles;

const HeaderBasket = () => {
  const navigate = useNavigate();
  const cartItems = useAppSelector(getCartTotalQuantitySelector);

  return (
    <div className={basketContainer} onClick={() => navigate("/cart")}>
      <Logo title="basket icon" />
      <div className={basketQuantity}>{cartItems}</div>
    </div>
  );
};

export default HeaderBasket;
