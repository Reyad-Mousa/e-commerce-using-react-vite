import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/product";
import { memo } from "react";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type CartItemsProps = TProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItem = memo(
  ({
    id,
    img,
    price,
    title,
    max,
    quantity,
    changeQuantityHandler,
    removeItemHandler,
  }: CartItemsProps) => {
    //  render option list
    const renderOptions = Array(max)
      .fill(0)
      .map((_, idx) => {
        const quantity = ++idx;
        return (
          <option value={quantity} key={quantity}>
            {quantity}
          </option>
        );
      });

    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +event.target.value;
      changeQuantityHandler(id, quantity);
    };
    // const  removeItem = (event: React.CLic<HTMLSelectElement>) =>
    return (
      <div className={cartItem}>
        <div className={product}>
          <div className={productImg}>
            <img src={img} alt={title} />
          </div>
          <div className={productInfo}>
            <h2>{title}</h2>
            <h3>{price}EGP</h3>
            <Button
              variant="danger"
              style={{ color: "white" }}
              className="mt-auto "
              onClick={() => removeItemHandler(id)}
            >
              Remove
            </Button>
          </div>
        </div>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select
            aria-label="Default select example"
            value={quantity}
            onChange={changeQuantity}
          >
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default CartItem;
