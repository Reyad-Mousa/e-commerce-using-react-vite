import { configureStore } from "@reduxjs/toolkit";
import CategoriesSlice from "./Categories/categoriesSlice";

export const store = configureStore({
  reducer: { CategoriesSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
