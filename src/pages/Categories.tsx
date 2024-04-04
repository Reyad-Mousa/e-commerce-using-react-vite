import { Container, Row, Col } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetCategories from "@store/Categories/act/actGetCategories";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, records, error } = useAppSelector(
    (state) => state.CategoriesSlice
  );

  useEffect(() => {
    dispatch(actGetCategories());
  }, [dispatch]);

  const categoriesList =
    records.length > 0
      ? records.map((record) => (
          <Col
            key={record.id}
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            <Category {...record} />
          </Col>
        ))
      : "There are no categories";

  return (
    <Container>
      <Row>{categoriesList}</Row>
    </Container>
  );
};

export default Categories;
