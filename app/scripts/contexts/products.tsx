import React, { ReactNode } from "react";
import {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from "react";
import {
  Product,
  ProductState,
  initialState,
  productsReducer,
} from "../reducers/products";

// allows removal of the function defitions from the param list
export function emptyFunction() {
  return null;
}

export const ProductsContext = createContext<
  ProductState & {
    updateProducts: (products: Product[]) => void;
    updateShowProducts: (showProducts: boolean) => void;
  }
>({
  ...initialState,
  // not sure how else to define these functions
  // without adding them to the reducer and then ignoring them in the coverage report;
  // and for some reason these ignores don't work in the coverage report
  /* istanbul ignore next */
  updateProducts: emptyFunction,
  /* istanbul ignore next */
  updateShowProducts: emptyFunction,
});

export const ProductsProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const updateProducts = useCallback((products: Product[]) => {
    dispatch({ type: "UPDATE_PRODUCTS", payload: { products } });
  }, []);

  const updateShowProducts = useCallback((showProducts: boolean) => {
    dispatch({ type: "UPDATE_SHOW_PRODUCTS", payload: { showProducts } });
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

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    throw new Error("useProducts must be used within ProductsContext");
  }

  return context;
};
