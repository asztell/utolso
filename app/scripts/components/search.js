import React, { useCallback } from "react";
import { fetchProducts } from "../utils/services";
import useProducts from "../contexts/products";

export default function Search() {
  const { updateProducts, updateShowProducts } = useProducts();

  const onSearch = useCallback(
    async (e) => {
      const body = { name: e.target.value };
      try {
        const products = await fetchProducts(body);
        updateProducts(products);
        updateShowProducts(true);
      } catch (error) {
        console.warn("There was an error", error);
      }
    },
    [updateProducts, updateShowProducts]
  );

  return (
    <div className="searchbox">
      <div className="box">
        <input type="text" id="search" onChange={onSearch} />
        <i className="material-icons search"></i>
      </div>
    </div>
  );
}
