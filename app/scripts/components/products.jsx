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
    <ul onMouseLeave={onMouseLeave} className="search-results">
      {products.slice(0, 4).map((product) => {
        return (
          <li key={product._id} className="product-card">
            <img src={product.picture} />
            <div className="product-info">
              <h3>{product.name.toUpperCase()}</h3>
              <p>{product.about}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
