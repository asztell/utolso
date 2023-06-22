import React, { createContext, useReducer, useContext } from "react";
import productsReducer, { initialState } from "../reducers/products";

const ProductsContext = createContext(initialState);

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const updateProducts = (products) => {
    dispatch({ type: "UPDATE_PRODUCTS", payload: products });
  };

  const value = {
    products: state.products,
    updateProducts,
  };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    throw new Error("useProducts must be used within ProductsContext");
  }

  return context;
};

export default useProducts;
