import { Button, Modal, Spinner } from "react-bootstrap";
import { TProduct } from "@customTypes/product.types";
import { addToCart } from "@store/cart/cartSlice";
import { useEffect, useState, memo } from "react";
import { useAppDispatch } from "@store/hooks";
import LikeFill from "@assets/svg/like-fill.svg?react";
import Like from "@assets/svg/like.svg?react";
import { actLikeToggle } from "@store/Wishlist/WishlistSlices";

// styles
import styles from "./styles.module.css";
const { product, productImg, maximumNotice, wishlistBtn } = styles;

const Product = memo(
  ({
    id,
    title,
    price,
    img,
    max,
    quantity,
    isLiked,
    isAccessToken,
  }: TProduct) => {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    const currentRemainingQuantity = max - (quantity ?? 0);
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

    useEffect(() => {
      if (!isBtnDisabled) {
        return;
      }

      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isBtnDisabled]);

    const addToCartHandler = () => {
      if (isAccessToken) {
        dispatch(addToCart(id));
        setIsBtnDisabled(true);
      } else {
        setShowModal(true);
      }
    };

    const LikeToggleHandler = () => {
      if (isAccessToken) {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(actLikeToggle(id))
            .unwrap()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      } else {
        setShowModal(true);
      }
    };
    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>

        <div className={product}>
          <div className={wishlistBtn} onClick={LikeToggleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <div className={productImg}>
            <img src={img} alt={title} />
          </div>
          <h2>{title}</h2>
          <h3>{price} EGP</h3>
          <p className={maximumNotice}>
            {quantityReachedToMax
              ? "You reach to the limit"
              : `You can add ${currentRemainingQuantity} item(s)`}
          </p>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={addToCartHandler}
            disabled={isBtnDisabled || quantityReachedToMax}
          >
            {isBtnDisabled ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
        </div>
      </>
    );
  }
);

export default Product;
