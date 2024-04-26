import { Product } from "@components/eCommerce";
import { TProduct } from "@customTypes/product.types";
import Loading from "@components/feedback/Loading";
import GridList from "@components/common/GridList/GridList";
import useWishlist from "@hooks/useWishlist";

const Wishlist = () => {
  const { loading, error, records } = useWishlist();

  return (
    <>
      <h1>Your Wishlist</h1>
      <Loading status={loading} error={error}>
        <GridList<TProduct>
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;
