import { Container } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import Loading from "@components/feedback/Loading";
import GridList from "@components/common/GridList/GridList";
import { TProduct } from "@customTypes/product.types";
import useProducts from "@hooks/useProducts";
const Products = () => {
  const { loading, error, productsFullInfo } = useProducts();
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
