import { TLoading } from "@customTypes/shared.types";
import CategorySkeleton from "./Skeletons/CategorySkeletons/CategorySkeletons";
import ProductSkeleton from "./Skeletons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "./Skeletons/CartSkeleton/CartSkeleton";

const skeletonsTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
};

type LoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  type?: keyof typeof skeletonsTypes;
};

const Loading = ({
  status,
  error,
  children,
  type = "category",
}: LoadingProps) => {
  const Component = skeletonsTypes[type];

  if (status === "pending") {
    return <Component />;
  }
  if (status === "failed") {
    return <div>{error}</div>;
  }
  return <div>{children}</div>;
};

export default Loading;
