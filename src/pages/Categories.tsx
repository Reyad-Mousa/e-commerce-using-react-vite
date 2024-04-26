import { Container } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import Loading from "@components/feedback/Loading";
import GridList from "@components/common/GridList/GridList";
import useCategories from "@hooks/useCategories";

const Categories = () => {
  const { loading, records, error } = useCategories();
  return (
    <Container>
      <Loading status={loading} error={error}>
        <GridList
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
