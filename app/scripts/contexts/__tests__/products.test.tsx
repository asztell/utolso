import React, { createContext, useContext, useReducer } from "react";
import { render } from "@testing-library/react";
import { ProductsContext, ProductsProvider, useProducts } from "../products";
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

  it("creates the context", () => {
    expect(createContext).toHaveBeenCalledWith({
      ...initialState,
      updateProducts: expect.any(Function),
      updateShowProducts: expect.any(Function),
    });
  });

  describe("hook", () => {
    it("defines hook that uses the product context", () => {
      const contextValue = { products: [] }; // would be nice if a real looking mock was passed here for typescript to not complain
      jest.mocked(useContext).mockReturnValue(contextValue);

      expect(useProducts()).toBe(contextValue);
    });

    it("throws if hook used outside a provider", () => {
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

    it("renders", () => {
      const { baseElement } = setup();
      expect(baseElement).toMatchSnapshot();
    });

    it("provides the products state", async () => {
      const {
        result: { products, showProducts },
      } = setup();

      expect(products).toBe(state.products);
      expect(showProducts).toBe(state.showProducts);
    });

    it("provides means to dispatch an update products action", () => {
      const newProducts = [...state.products];
      const {
        result: { updateProducts },
      } = setup();

      updateProducts(newProducts);

      expect(dispatchMock).toHaveBeenCalledWith({
        type: "UPDATE_PRODUCTS",
        payload: newProducts,
      });
    });

    it("provides means to dispatch an update products action", () => {
      const newShowProducts = !state.showProducts;
      const {
        result: { updateShowProducts },
      } = setup();

      updateShowProducts(newShowProducts);

      expect(dispatchMock).toHaveBeenCalledWith({
        type: "UPDATE_SHOW_PRODUCTS",
        payload: newShowProducts,
      });
    });
  });
});

// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { IntlProvider } from "react-intl";
// import { ProductsProvider } from "../products";
// import { Products } from "../../components/products";
// import { Search } from "../../components/search";
// import { fetchProductsByName } from "../../utils/services";
// import { act } from "react-dom/test-utils";

// describe("<ProductsProvider />", () => {
//   let fetchSpy;
//   beforeAll(() => {
//     fetchSpy = jest.spyOn(global, "fetch");
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });
//   // I had a hard time mocking the reducer
//   // I would need to do some more research on how to mock the reducer
//   // so I could test the ProductsProvider and the useReducer hook
//   xtest("ProductsProvider", () => {
//     // const response = JSON.parse(
//     // const response = JSON.stringify(

//     const response =
//       '[{"_id":"1","isActive":true,"price":"100","picture":"placehold.it/32x32","name":"Product 1","about":"Description 1","tags":["tag1","tag2"]}]';
//     const mockResponse = {
//       json: jest.fn().mockResolvedValueOnce(JSON.parse(response)),
//     };
//     fetchSpy.mockResolvedValueOnce(mockResponse);
//     // jest.mock("../../utils/services", () => ({
//     //   fetchProductsByName: () => {
//     //     json: jest.fn().mockResolvedValueOnce(response);
//     //   },
//     // }));
//     // services.fetchProductsByName = jest.fn().mockReturnValue(2)
//     render(
//       <IntlProvider
//         locale={navigator.language}
//         messages={{
//           "Nav.NavItem.Sale": "test SALE UPON SALE",
//           "Nav.NavItem.Holiday": "test HOLIDAY",
//           "Nav.NavItem.New": "test NEW",
//           "Nav.NavItem.Products": "test PRODUCTS",
//           "Nav.NavItem.Best-Sellers": "test BEST-SELLERS",
//           "Nav.NavItem.Goodbyes": "test GOODBYES",
//           "Nav.NavItem.Stores": "test STORES",
//           "Nav.NavItem.Inspiration": "test INSPIRATION",
//           "PromoStrip.Promo.Text":
//             "test COOL ADVERTISING WITH PROMOTIONS AND SALES!",
//           "PromoStrip.URL.Text": "test SIGN UP",
//           "SearchInput.Placeholder": "test SEARCH",
//           "SearchResultsSummary.Displayed":
//             "test DISPLAYING {displayed} OF {total} RESULTS",
//           "SearchResultsSummary.Total": "test SEE ALL RESULTS",
//         }}
//       >
//         <ProductsProvider>
//           <Search />
//           <Products />
//         </ProductsProvider>
//       </IntlProvider>
//     );
//     const searchInput = screen.getByPlaceholderText("test SEARCH");
//     expect(searchInput).toBeInTheDocument();
//     fireEvent.change(searchInput, { target: { value: "test" } });
//     // @ts-ignore
//     expect(searchInput.value).toBe("test");
//     act(() => {
//       fireEvent.click(screen.getByText(/^SEE ALL RESULTS/));
//     });

//     // expect(screen.getByText(/^SEE ALL RESULTS/).textContent).toBe(
//     //   "SEE ALL RESULTS"
//     // );
//     // const wrapper = ({ children }) => (
//     //   <ProductsProvider>{children}</ProductsProvider>
//     // );

//     // render(<Products />, { wrapper });
//     // expect(screen.getByText(/^SEE ALL RESULTS/).textContent).toBe(
//     //   "My Name Is: Leia Organa"
//     // );
//   });
// });
