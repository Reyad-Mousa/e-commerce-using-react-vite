import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts
import { lazy, Suspense } from "react";
import { MainLayout } from "src/layout";
import Wishlist from "@pages/WishList";
// pages
const Home = lazy(() => import("@pages/Home"));
const Products = lazy(() => import("@pages/Products"));
const Categories = lazy(() => import("@pages/Categories"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Error = lazy(() => import("@pages/Error"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Cart = lazy(() => import("@pages/Cart"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,


    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback="loading please wait">
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback="loading please wait">
            <Cart />{" "}
          </Suspense>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <Suspense fallback="loading please wait">
            <Wishlist />
          </Suspense>
        ),
      },
      {
        path: "categories",
        element: (
          <Suspense fallback="loading please wait">
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "/categories/products/:prefix",
        element: (
          <Suspense fallback="loading please wait">
            <Products />
          </Suspense>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "about-us",
        element: (
          <Suspense fallback="loading please wait">
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback="loading please wait">
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback="loading please wait">
            <Register />
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
