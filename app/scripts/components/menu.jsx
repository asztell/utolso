import React from "react";
import { Search } from "./search";
import { Products } from "./products";
import { ProductsProvider } from "../contexts/products";

export function Menu() {
  return (
    <ProductsProvider>
      <header className="Menu box">
        <div className="MenuContent box">
          <Logo />
          <PromoStrip />
          <Search />
          <MyMacLink />
          <ShoppingCartLink />
        </div>
        <Nav />
      </header>
      <Products />
    </ProductsProvider>
  );
}

function Nav() {
  return (
    <nav className="Nav box">
      <a href="#" className="NavItem">
        HOLIDAY
      </a>
      <a href="#" className="NavItem">
        WHAT'S NEW
      </a>
      <a href="#" className="NavItem">
        PRODUCTS
      </a>
      <a href="#" className="NavItem">
        BESTSELLERS
      </a>
      <a href="#" className="NavItem">
        GOODBYES
      </a>
      <a href="#" className="NavItem">
        STORES
      </a>
      <a href="#" className="NavItem">
        INSPIRATION
      </a>
    </nav>
  );
}

function Logo() {
  return (
    <img
      className="Logo box"
      src="/img/mac_logo.svg
      "
      alt=""
    />
  );
}

function PromoStrip() {
  return (
    <span className="PromoStrip box">
      COOL ADVERTIZING WITH PROMOTIONS AND SALES!
      <a href="#" className="PromoURL">
        SIGN UP
      </a>
    </span>
  );
}

function MyMacLink() {
  return (
    <a href="#" className="MyMacLink">
      <img src="/img/my_mac.png" alt="My MAC" />
    </a>
  );
}

function ShoppingCartLink() {
  return (
    <a href="#" className="ShoppingCartLink">
      <img src="/img/shopping_cart.png" alt="Shopping Cart" />
    </a>
  );
}
