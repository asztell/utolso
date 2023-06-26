import React from "react";
import { IntlProvider } from "react-intl";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductsProvider } from "../../contexts/products";
import { Search } from "../search";
import { fetchProductsByName } from "../../utils/services";
import { act } from "react-dom/test-utils";

jest.mock("../../utils/services", () => ({
  fetchProductsByName: jest.fn(() => Promise.resolve([])),
}));

describe("<Search />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders", () => {
    render(
      <IntlProvider
        locale={navigator.language}
        messages={{
          "SearchInput.Placeholder": "test SEARCH",
        }}
      >
        <ProductsProvider>
          <Search />
        </ProductsProvider>
      </IntlProvider>
    );
    expect(screen.getByPlaceholderText("test SEARCH")).toBeInTheDocument();
    act(() => {
      fireEvent.change(screen.getByPlaceholderText("test SEARCH"), {
        target: { value: "test" },
      });
    });
    expect(screen.getByPlaceholderText("test SEARCH")).toHaveValue("test");
  });
});
