export type TProduct = {
  id: number; // id of the option = >?<
  title: string;
  cat_prefix: string;
  img: string;
  price: number;
  max: number;
  quantity?: number;
  isLiked?: boolean;
  isAccessToken?: boolean;
};
