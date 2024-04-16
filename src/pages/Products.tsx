import { Container } from "react-bootstrap";
import { useEffect } from "react";
import {
  actGetProductsByPrefix,
  productsCleanUp,
} from "@store/Products/productsSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useParams } from "react-router-dom";
import { Product } from "@components/eCommerce";
import Loading from "@components/feedback/Loading";
import GridList from "@components/common/GridList/GridList";
import { TProduct } from "@customTypes/product";
const Products = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const { loading, records, error } = useAppSelector(
    (state) => state.productsSlice
  );
  const cartItems = useAppSelector((state) => state.cartSlice.items);

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id as number] || 0,
  }));

  useEffect(() => {
    // let prefix: string; (1
    // if (params.prefix && typeof params.prefix === "string") {  2
    //   prefix = params.prefix;3
    // dispatch(actGetProductsByPrefix(prefix));} 4) ===
    dispatch(actGetProductsByPrefix(params.prefix as string));
    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);

  return (
    <Container>
      <Loading status={loading} error={error}>
        <GridList<TProduct>
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
