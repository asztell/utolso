import React from "react";
import { IntlProvider } from "react-intl";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductsProvider, useProducts } from "../../contexts/products";
import { Products } from "../products";

jest.mock("../../contexts/products", () => {
  const actual = jest.requireActual("../../contexts/products");
  return {
    ...actual,
    useProducts: jest.fn(),
  };
});

describe("<Products />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.mocked(useProducts).mockReturnValue({
      products: [
        {
          _id: "string",
          isActive: "string",
          price: "string",
          picture: "string",
          name: "string",
          about: "string",
          tags: ["string"],
        },
      ],
      showProducts: true,
      updateProducts: jest.fn(),
      updateShowProducts: jest.fn((showProducts) => (showProducts = false)),
    });
  });

  it("renders", () => {
    render(
      <IntlProvider
        locale={navigator.language}
        messages={{
          "SearchResultsSummary.Displayed":
            "test DISPLAYING {displayed} OF {total} RESULTS",
          "SearchResultsSummary.Total": "test SEE ALL RESULTS",
        }}
      >
        <ProductsProvider>
          <Products />
        </ProductsProvider>
      </IntlProvider>
    );
    expect(
      screen.getByText("test DISPLAYING 1 OF 1 RESULTS")
    ).toBeInTheDocument();
  });

  it("renders", async () => {
    render(
      <IntlProvider
        locale={navigator.language}
        messages={{
          "SearchResultsSummary.Displayed":
            "test DISPLAYING {displayed} OF {total} RESULTS",
          "SearchResultsSummary.Total": "test SEE ALL RESULTS",
        }}
      >
        <ProductsProvider>
          <Products />
        </ProductsProvider>
      </IntlProvider>
    );
    expect(
      screen.getByText("test DISPLAYING 1 OF 1 RESULTS")
    ).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.mouseOver(screen.getByText("test DISPLAYING 1 OF 1 RESULTS"));
    });
    await waitFor(() => {
      fireEvent.mouseLeave(screen.getByText("test DISPLAYING 1 OF 1 RESULTS"));
    });
    expect(screen.getByText("test DISPLAYING 1 OF 1 RESULTS")).toBeNull();
  });
});
