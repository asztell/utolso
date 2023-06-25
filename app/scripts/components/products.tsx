import * as React from "react";
import { useCallback, useMemo } from "react";
import { useProducts } from "../contexts/products";

export function Products() {
  const { products, showProducts, updateShowProducts } = useProducts();

  const onMouseLeave = useCallback(() => {
    updateShowProducts(false);
  }, [updateShowProducts]);

  const numberOfProductsDisplayed = useMemo(
    () => (products.length > 4 ? 4 : products.length),
    [products.length]
  );

  if (!showProducts) {
    return null;
  }

  return (
    <section>
      <h2 className="SearchResultsSummary">
        DISPLAYING {numberOfProductsDisplayed} OF {products.length} RESULTS{" "}
        <a href="#">SEE ALL RESULTS</a>
      </h2>
      <hr />
      <ul onMouseLeave={onMouseLeave} className="SearchResults">
        {products.slice(0, 4).map((product) => {
          return (
            // this anchor tag would normally be a Link component from react-router-dom
            // pointing to all search results page
            <a key={product._id} href="#">
              <li className="ProductCard">
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
