import React from "react";
import { IntlProvider } from "react-intl";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductsProvider } from "../../contexts/products";
import { Search } from "../search";
import * as services from "../../utils/services";
import { act } from "react-dom/test-utils";

jest.mock("../../utils/services");

describe("<Search />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // spy on the default export of config
  const fetchProductsByName = jest.spyOn(services, "fetchProductsByName");

  jest.useFakeTimers();

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
    await act(() => {
      fireEvent.change(screen.getByPlaceholderText("test SEARCH"), {
        target: { value: "t" },
      });
    });
    await act(async () => {
      await jest.runAllTimers();
    });
    expect(screen.getByPlaceholderText("test SEARCH")).toHaveValue("t");
    expect(localStorage.search).toBe(JSON.stringify("t"));
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
    await act(() => {
      fireEvent.change(screen.getByPlaceholderText("test SEARCH"), {
        target: { value: "t" },
      });
    });
    jest.runAllTimers();
    expect(screen.getByPlaceholderText("test SEARCH")).toHaveValue("t");
    expect(localStorage.search).toBe(JSON.stringify("t"));
  });
});
