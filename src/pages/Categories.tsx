import { Container } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetCategories from "@store/Categories/act/actGetCategories";
import Loading from "@components/feedback/Loading";
import GridList from "@components/common/GridList/GridList";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, records, error } = useAppSelector(
    (state) => state.CategoriesSlice
  );

  useEffect(() => {
    // MAKE this when category not change mostly
    if (!records.length) {
      dispatch(actGetCategories());
    }
  }, [dispatch, records]);

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
