import React from "react";
import { IntlProvider } from "react-intl";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductsProvider } from "../../contexts/products";
import { Search } from "../search";
import * as services from "../../utils/services";

jest.mock("../../utils/services");

describe("<Search />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // spy on the default export of config
  const fetchProductsByName = jest.spyOn(services, "fetchProductsByName");

  test("renders and fetches successfully", async () => {
    // replace the implementation
    fetchProductsByName.mockImplementation(() => Promise.resolve([]));
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
    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText("test SEARCH"), {
        target: { value: "t" },
      });
    });
    expect(screen.getByPlaceholderText("test SEARCH")).toHaveValue("t");
  });

  test("renders but fetch fails", async () => {
    // replace the implementation with a rejected promise
    fetchProductsByName.mockImplementation(() =>
      Promise.reject(
        new Error("This is an expected error for testing purposes")
      )
    );
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
    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText("test SEARCH"), {
        target: { value: "t" },
      });
    });
    expect(screen.getByPlaceholderText("test SEARCH")).toHaveValue("t");
  });
});
