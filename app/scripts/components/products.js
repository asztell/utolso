import React, { useCallback } from "react";
import useProducts from "../contexts/products";

export default function Products() {
  const { products, showProducts, updateShowProducts } = useProducts();

  const onMouseLeave = useCallback(() => {
    updateShowProducts(false);
  }, [updateShowProducts]);

  if (!showProducts) {
    return null;
  }

  return (
    <>
      <ul onMouseLeave={onMouseLeave} className="search-results">
        {products.map((product) => {
          return (
            <li key={product._id} className="search-result">
              <img src={product.picture} />
              <div className="search-result-info">
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
