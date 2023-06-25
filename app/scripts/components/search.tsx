import * as React from "react";
import { useCallback } from "react";
import { fetchProductsByName } from "../utils/services";
import { useProducts } from "../contexts/products";

export function Search() {
  const { updateProducts, updateShowProducts } = useProducts();

  const onSearch = useCallback(
    async ({ target: { value } }) => {
      try {
        const products = await fetchProductsByName(value);
        updateProducts(products);
        updateShowProducts(true);
      } catch (error) {
        console.warn("There was an error", error);
      }
    },
    [updateProducts, updateShowProducts]
  );

  return (
    <div className="Search box">
      <input type="text" onChange={onSearch} placeholder="SEARCH" />
    </div>
  );
}
