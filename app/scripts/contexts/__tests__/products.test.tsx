import React, { createContext, useContext, useReducer } from "react";
import { render } from "@testing-library/react";
import {
  ProductsContext,
  ProductsProvider,
  useProducts,
  emptyFunction,
} from "../products";
import { initialState } from "../../reducers/products";

jest.mock("react", () => {
  const actual = jest.requireActual("react");

  jest.spyOn(actual, "createContext");
  jest.spyOn(actual, "useContext");

  return {
    ...actual,
    useReducer: jest.fn(),
  };
});

describe("<ProductsProvider />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("creates the context", () => {
    expect(createContext).toHaveBeenCalledWith({
      ...initialState,
      updateProducts: expect.any(Function),
      updateShowProducts: expect.any(Function),
    });
  });

  describe("hook", () => {
    test("defines hook that uses the product context", () => {
      const contextValue = { products: [] }; // would be nice if a real looking mock was passed here for typescript to not complain
      jest.mocked(useContext).mockReturnValue(contextValue);

      expect(useProducts()).toBe(contextValue);
    });

    test("throws if hook used outside a provider", () => {
      jest.mocked(useContext).mockReturnValue(undefined);

      expect(() => useProducts()).toThrow(
        "useProducts must be used within ProductsContext"
      );
    });
  });

  describe("provider", () => {
    const dispatchMock = jest.fn();
    const state = {
      products: [
        { _id: 1, name: "Product 1" },
        { _id: 2, name: "Product 2" },
      ],
      showProducts: true,
    };

    const setup = () => {
      const consumerRenderProp = jest.fn();

      const { baseElement } = render(
        <ProductsProvider>
          <ProductsContext.Consumer>
            {consumerRenderProp}
          </ProductsContext.Consumer>
          <div className="my-div" />
        </ProductsProvider>
      );

      return {
        result: consumerRenderProp.mock.lastCall[0],
        baseElement,
      };
    };

    beforeEach(() => {
      jest.mocked(useReducer).mockReturnValue([state, dispatchMock]);
    });

    test("renders", () => {
      const { baseElement } = setup();
      expect(baseElement).toMatchSnapshot();
    });

    test("provides the products state", async () => {
      const {
        result: { products, showProducts },
      } = setup();

      expect(products).toBe(state.products);
      expect(showProducts).toBe(state.showProducts);
    });

    test("provides means to dispatch an update products action", () => {
      const newProducts = [...state.products];
      const {
        result: { updateProducts },
      } = setup();

      updateProducts(newProducts);

      expect(dispatchMock).toHaveBeenCalledWith({
        type: "UPDATE_PRODUCTS",
        payload: { products: newProducts },
      });
    });

    test("provides means to dispatch an update products action", () => {
      const newShowProducts = !state.showProducts;
      const {
        result: { updateShowProducts },
      } = setup();

      updateShowProducts(newShowProducts);

      expect(dispatchMock).toHaveBeenCalledWith({
        type: "UPDATE_SHOW_PRODUCTS",
        payload: { showProducts: newShowProducts },
      });
    });

    test("emptyFunction returns null", () => {
      expect(emptyFunction()).toBe(null);
    });
  });
});
