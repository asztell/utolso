import * as React from "react";
import {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { initialState, productsReducer } from "../reducers/products";
import { Props } from "../types";

const ProductsContext = createContext(initialState);

// export const ProductsProvider: React.FC<Props> = ({ children }) => {
export function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const updateProducts = useCallback((products) => {
    dispatch({ type: "UPDATE_PRODUCTS", payload: products });
  }, []);

  const updateShowProducts = useCallback((showProducts) => {
    dispatch({ type: "UPDATE_SHOW_PRODUCTS", payload: showProducts });
  }, []);

  const value = useMemo(
    () => ({
      products: state.products,
      showProducts: state.showProducts,
      updateProducts,
      updateShowProducts,
    }),
    [updateProducts, updateShowProducts, state.products, state.showProducts]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    throw new Error("useProducts must be used within ProductsContext");
  }

  return context;
};
