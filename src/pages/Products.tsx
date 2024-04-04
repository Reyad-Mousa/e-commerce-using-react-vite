import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { actGetProductsByPrefix } from "@store/Products/productsSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useParams } from "react-router-dom";
import { Product } from "@components/eCommerce";
const Products = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const { loading, records, error } = useAppSelector(
    (state) => state.productsSlice
  );

  useEffect(() => {
    // let prefix: string; (1
    // if (params.prefix && typeof params.prefix === "string") {  2
    //   prefix = params.prefix;3
    // dispatch(actGetProductsByPrefix(prefix));} 4) ===
    dispatch(actGetProductsByPrefix(params.prefix as string));
  }, [dispatch, params]);

  const ProductsList =
    records.length > 0
      ? records.map((record) => (
          <Col
            key={record.id}
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            <Product {...record} />
          </Col>
        ))
      : "There are no products available";

  return (
    <Container>
      <Row>{ProductsList}</Row>
    </Container>
  );
};

export default Products;
