import React from "react";
import { FormattedMessage } from "react-intl";
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

/*
  The following components would normally be extracted in their own files with their own tests.
  However, for the sake of simplicity,
  and given that they have no complex functionality I kept them here.
*/
function Nav() {
  return (
    <nav className="Nav box">
      {/* all these anchor tags would normally be Link components from react-router-dom, etc. */}
      <a href="#" className="NavItem NavItemRed">
        <FormattedMessage id="Nav.NavItem.Sale" />
      </a>
      <a href="#" className="NavItem">
        <FormattedMessage id="Nav.NavItem.Holiday" />
      </a>
      <a href="#" className="NavItem">
        <FormattedMessage id="Nav.NavItem.New" />
      </a>
      <a href="#" className="NavItem">
        <FormattedMessage id="Nav.NavItem.Products" />
      </a>
      <a href="#" className="NavItem">
        <FormattedMessage id="Nav.NavItem.Best-Sellers" />
      </a>
      <a href="#" className="NavItem">
        <FormattedMessage id="Nav.NavItem.Goodbyes" />
      </a>
      {/* <a href="#" className="NavItem">
        <FormattedMessage id="Nav.NavItem.Stores" />
      </a> */}
      <a href="#" className="NavItem">
        <FormattedMessage id="Nav.NavItem.Inspiration" />
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
      alt="M.A.C. Cosmetics"
    />
  );
}

function PromoStrip() {
  return (
    <span className="PromoStrip box">
      <FormattedMessage id="PromoStrip.Promo.Text" />
      <a href="#" className="PromoURL">
        {/* lol I'm sure there is a better way to do this */}{" "}
        <FormattedMessage id="PromoStrip.URL.Text" />
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
