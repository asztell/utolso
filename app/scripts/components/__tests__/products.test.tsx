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
  const products = [
    {
      _id: "string",
      isActive: "string",
      price: "string",
      picture: "string",
      name: "string",
      about: "string",
      tags: ["string"],
    },
  ];
  beforeEach(() => {
    jest.mocked(useProducts).mockReturnValue({
      products,
      showProducts: true,
      updateProducts: jest.fn(),
      updateShowProducts: jest.fn((showProducts) => (showProducts = false)),
    });
  });

  test("renders", () => {
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
    const element = screen.getByText("test DISPLAYING 1 OF 1 RESULTS");
    expect(element).toBeInTheDocument();
  });

  test("renders", async () => {
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
        {
          _id: "string2",
          isActive: "string",
          price: "string",
          picture: "string",
          name: "string",
          about: "string",
          tags: ["string"],
        },
        {
          _id: "string3",
          isActive: "string",
          price: "string",
          picture: "string",
          name: "string",
          about: "string",
          tags: ["string"],
        },
        {
          _id: "string4",
          isActive: "string",
          price: "string",
          picture: "string",
          name: "string",
          about: "string",
          tags: ["string"],
        },
        {
          _id: "string5",
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
    const element = screen.getByText("test DISPLAYING 4 OF 5 RESULTS");
    expect(element).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.mouseOver(element);
    });
    await waitFor(() => {
      fireEvent.mouseLeave(element);
    });
  });
});
