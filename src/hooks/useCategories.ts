import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetCategories from "@store/Categories/act/actGetCategories";
// import { cleanCategoryProductsFullInfo } from "@store/Categories/categoriesSlice";

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { loading, records, error } = useAppSelector(
    (state) => state.CategoriesSlice
  );

  useEffect(() => {
    // MAKE this when category not change mostly
    if (!records.length) {
      const promise = dispatch(actGetCategories());
      return () => {
        promise.abort();
        // dispatch(cleanCategoryProductsFullInfo());
      };
    }
  }, [dispatch, records]);

  return { loading, records, error };
};

export default useCategories;
