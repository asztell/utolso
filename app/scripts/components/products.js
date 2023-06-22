import React from "react";
import useProducts from "../contexts/products";

export default function Products() {
  const { products } = useProducts();
  console.log("products", products);

  return (
    <>
      <div className="search-results">
        {products.map((product) => {
          return (
            <div key={product._id} className="search-result">
              <img src={product.picture} />
              <div className="search-result-info">
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
