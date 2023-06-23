import React, {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from "react";
import productsReducer, { initialState } from "../reducers/products";

const ProductsContext = createContext(initialState);

export const ProductsProvider = ({ children }) => {
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
};

const useProducts = () => {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    throw new Error("useProducts must be used within ProductsContext");
  }

  return context;
};

export default useProducts;
