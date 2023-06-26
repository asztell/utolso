import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IntlProvider } from "react-intl";
import { ProductsProvider } from "../products";
import { Products } from "../../components/products";
import { Search } from "../../components/search";
import { fetchProductsByName } from "../../utils/services";
import { act } from "react-dom/test-utils";

describe("<ProductsProvider />", () => {
  let fetchSpy;
  beforeAll(() => {
    fetchSpy = jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  xtest("ProductsProvider", () => {
    // const response = JSON.parse(
    // const response = JSON.stringify(

    const response =
      '[{"_id":"1","isActive":true,"price":"100","picture":"placehold.it/32x32","name":"Product 1","about":"Description 1","tags":["tag1","tag2"]}]';
    const mockResponse = {
      json: jest.fn().mockResolvedValueOnce(JSON.parse(response)),
    };
    fetchSpy.mockResolvedValueOnce(mockResponse);
    // jest.mock("../../utils/services", () => ({
    //   fetchProductsByName: () => {
    //     json: jest.fn().mockResolvedValueOnce(response);
    //   },
    // }));
    // services.fetchProductsByName = jest.fn().mockReturnValue(2)
    render(
      <IntlProvider
        locale={navigator.language}
        messages={{
          "Nav.NavItem.Sale": "test SALE UPON SALE",
          "Nav.NavItem.Holiday": "test HOLIDAY",
          "Nav.NavItem.New": "test NEW",
          "Nav.NavItem.Products": "test PRODUCTS",
          "Nav.NavItem.Best-Sellers": "test BEST-SELLERS",
          "Nav.NavItem.Goodbyes": "test GOODBYES",
          "Nav.NavItem.Stores": "test STORES",
          "Nav.NavItem.Inspiration": "test INSPIRATION",
          "PromoStrip.Promo.Text":
            "test COOL ADVERTISING WITH PROMOTIONS AND SALES!",
          "PromoStrip.URL.Text": "test SIGN UP",
          "SearchInput.Placeholder": "test SEARCH",
          "SearchResultsSummary.Displayed":
            "test DISPLAYING {displayed} OF {total} RESULTS",
          "SearchResultsSummary.Total": "test SEE ALL RESULTS",
        }}
      >
        <ProductsProvider>
          <Search />
          <Products />
        </ProductsProvider>
      </IntlProvider>
    );
    const searchInput = screen.getByPlaceholderText("test SEARCH");
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: "test" } });
    // @ts-ignore
    expect(searchInput.value).toBe("test");
    act(() => {
      fireEvent.click(screen.getByText(/^SEE ALL RESULTS/));
    });

    // expect(screen.getByText(/^SEE ALL RESULTS/).textContent).toBe(
    //   "SEE ALL RESULTS"
    // );
    // const wrapper = ({ children }) => (
    //   <ProductsProvider>{children}</ProductsProvider>
    // );

    // render(<Products />, { wrapper });
    // expect(screen.getByText(/^SEE ALL RESULTS/).textContent).toBe(
    //   "My Name Is: Leia Organa"
    // );
  });
});
