import WishList from "@assets/svg/wishlist.svg?react";
import { useAppSelector } from "@store/hooks";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const { wishListContainer, wishListQuantity } = styles;

const HeaderWishlist = () => {
  const navigate = useNavigate();

  const totalQuantity = useAppSelector((state) => state.WishlistSlices.itemsId);

  console.log(totalQuantity);
  return (
    <div className={wishListContainer} onClick={() => navigate("/wishlist")}>
      <WishList title="wishList icon" />
      {totalQuantity.length > 0 && (
        <div className={wishListQuantity}>{totalQuantity.length}</div>
      )}
    </div>
  );
};

export default HeaderWishlist;
