// Import necessary functions from Redux toolkit and Redux persist
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Import your slices
import CategoriesSlice from "./Categories/categoriesSlice";
import productsSlice from "./Products/productsSlice";
import cartSlice from "./cart/cartSlice";
import WishlistSlices from "./Wishlist/WishlistSlices";
import auth from "./auth/authSlice";

// Configuration for Redux persist
// 'key' is the key for the persisted reducer's part of the Redux state
// 'storage' tells Redux persist to use localStorage for web as the storage backend
// 'whitelist' is an array of string names of reducers that we want to persist

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["users", "accessToken"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

// Combine all your slices into a rootReducer
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  CategoriesSlice,
  productsSlice,
  cartSlice: persistReducer(cartPersistConfig, cartSlice),
  WishlistSlices: WishlistSlices,
});

// Create a persisted reducer
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// Configure the Redux store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// This will be useful when you want to use them in your application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the configured store
const persistor = persistStore(store);
export { store, persistor };
