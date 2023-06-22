import React, { useCallback, useState } from "react";
import Search from "./search";
import Products from "./products";
import { ProductsProvider } from "../contexts/products";

function Menu() {
  // const [showingSearch, setShowingSearch] = useState(false);
  // const [products, setProducts] = useState([]);
  console.log(ProductsProvider);
  return (
    <>
      <ProductsProvider>
        <header className="menu">
          <div className="menu-container">
            <div className="menu-holder">
              <h1>ELC</h1>
              <nav>
                <a href="#" className="nav-item">
                  HOLIDAY
                </a>
                <a href="#" className="nav-item">
                  WHAT'S NEW
                </a>
                <a href="#" className="nav-item">
                  PRODUCTS
                </a>
                <a href="#" className="nav-item">
                  BESTSELLERS
                </a>
                <a href="#" className="nav-item">
                  GOODBYES
                </a>
                <a href="#" className="nav-item">
                  STORES
                </a>
                <a href="#" className="nav-item">
                  INSPIRATION
                </a>
              </nav>
              <Search />
            </div>
          </div>
        </header>
        <Products />
      </ProductsProvider>
    </>
  );
}

export default Menu;
