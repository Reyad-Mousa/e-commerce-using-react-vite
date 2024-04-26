import { TProduct } from "@customTypes/product.types";
import styles from "./styles.module.css";

type CartSubTotalPriceProps = { products: TProduct[] };
const CartSubTotalPrice = ({ products }: CartSubTotalPriceProps) => {
  const subTotal = products.reduce((sum, product) => {
    const price = product.price;
    const quantity = product.quantity;
    if (quantity && typeof quantity === "number") {
      return sum + price * quantity;
    } else {
      return sum;
    }
  }, 0);
  return (
    <div className={styles.container}>
      <span>Subtotal:</span>
      <span>{subTotal.toFixed(2)} EGP</span>
    </div>
  );
};

export default CartSubTotalPrice;
