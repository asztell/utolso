import * as React from "react";
import { useCallback } from "react";
import { useProducts } from "../contexts/products";

export function Products() {
  const { products, showProducts, updateShowProducts } = useProducts();

  const onMouseLeave = useCallback(() => {
    updateShowProducts(false);
  }, [updateShowProducts]);

  if (!showProducts) {
    return null;
  }

  return (
    <section>
      <h2 className="SearchResultsSummary">
        DISPLAYING 4 OF {products.length} RESULTS{" "}
        <a href="#">SEE ALL RESULTS</a>
      </h2>
      <hr />
      <ul onMouseLeave={onMouseLeave} className="SearchResults">
        {products.slice(0, 4).map((product) => {
          return (
            // this anchor tag would normally be a Link component from react-router-dom
            <a href="#">
              <li key={product._id} className="ProductCard">
                <img src={product.picture} />
                <div className="product-info">
                  <h3>{product.name.toUpperCase()}</h3>
                  <p>{product.about}</p>
                </div>
              </li>
            </a>
          );
        })}
      </ul>
    </section>
  );
}
