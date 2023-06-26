export type Product = {
  _id: string;
  isActive: string;
  price: string;
  picture: string;
  name: string;
  about: string;
  tags: string[];
};

export type UpdateProductsAction = {
  type: "UPDATE_PRODUCTS";
  payload: Product[];
};
export type UpdateShowProductsAction = {
  type: "UPDATE_SHOW_PRODUCTS";
  payload: boolean;
};

export type ProductState = {
  products: Product[];
  showProducts: boolean;
};
export const initialState: ProductState = {
  products: [],
  showProducts: false,
};

export const productsReducer = (
  state: ProductState,
  action: UpdateProductsAction | UpdateShowProductsAction
): ProductState => {
  const { type, payload } = action;

  switch (type) {
    // normally I would use constants for the action types
    // but with typescript, it is not necessary
    // since the compiler will catch any typos
    case "UPDATE_PRODUCTS":
      return {
        ...state,
        products: payload,
      };
    case "UPDATE_SHOW_PRODUCTS":
      return {
        ...state,
        showProducts: payload,
      };
    default:
      // to avoid ungraceful errors in the UI
      // I'm just returning the state;
      // typescript should catch typos in the action type
      return state;
  }
};
