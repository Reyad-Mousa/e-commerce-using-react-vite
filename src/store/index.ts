import { configureStore } from "@reduxjs/toolkit";
import CategoriesSlice from "./Categories/categoriesSlice";
import productsSlice from "./Products/productsSlice";

export const store = configureStore({
  reducer: { CategoriesSlice, productsSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
