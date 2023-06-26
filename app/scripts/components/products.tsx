import React from "react";
import { useCallback, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { useProducts } from "../contexts/products";

export function Products() {
  const { products, showProducts, updateShowProducts } = useProducts();

  // I chose mouseleave because it seemed like the most intuitive way
  // to close the dropdown,
  // but for a prod implementation I would want to consult a UX designer
  // to see what they think is best
  const onMouseLeave = useCallback(() => {
    updateShowProducts(false);
  }, [updateShowProducts]);

  const numberOfProductsDisplayed = useMemo(
    () => (products.length > 4 ? 4 : products.length),
    [products.length]
  );
  console.log("products", products);
  console.log("showProducts", showProducts);
  if (!showProducts) {
    return null;
  }

  return (
    <section>
      <h2 className="SearchResultsSummary">
        <FormattedMessage
          id="SearchResultsSummary.Displayed"
          values={{
            displayed: numberOfProductsDisplayed,
            total: products.length,
          }}
        />{" "}
        <a href="#">
          <FormattedMessage id="SearchResultsSummary.Total" />
        </a>
      </h2>
      <hr />
      <ul onMouseLeave={onMouseLeave} className="SearchResults">
        {products.slice(0, 4).map((product) => {
          return (
            // this anchor tag would normally be a Link component from react-router-dom, etc.
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
