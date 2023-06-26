import { productsReducer } from "../../reducers/products";
import type {
  UpdateProductsAction,
  UpdateShowProductsAction,
} from "../../reducers/products";

describe("productsReducer", () => {
  test("UPDATE_PRODUCTS", () => {
    const state = {
      products: [],
      showProducts: false,
    };
    const action: UpdateProductsAction = {
      type: "UPDATE_PRODUCTS",
      payload: [
        {
          _id: "1",
          isActive: "true",
          price: "100",
          picture: "http://placehold.it/32x32",
          name: "Product 1",
          about: "Description 1",
          tags: ["tag1", "tag2"],
        },
        {
          _id: "2",
          isActive: "true",
          price: "200",
          picture: "http://placehold.it/32x32",
          name: "Product 2",
          about: "Description 2",
          tags: ["tag1", "tag2"],
        },
      ],
    };
    const result = productsReducer(state, action);
    expect(result).toEqual({
      products: [
        {
          _id: "1",
          isActive: "true",
          price: "100",
          picture: "http://placehold.it/32x32",
          name: "Product 1",
          about: "Description 1",
          tags: ["tag1", "tag2"],
        },
        {
          _id: "2",
          isActive: "true",
          price: "200",
          picture: "http://placehold.it/32x32",
          name: "Product 2",
          about: "Description 2",
          tags: ["tag1", "tag2"],
        },
      ],
      showProducts: false,
    });
  });
  test("UPDATE_SHOW_PRODUCTS", () => {
    const state = {
      products: [],
      showProducts: false,
    };
    const action: UpdateShowProductsAction = {
      type: "UPDATE_SHOW_PRODUCTS",
      payload: true,
    };
    const result = productsReducer(state, action);
    expect(result).toEqual({
      products: [],
      showProducts: true,
    });
  });
  test("default for undefined action.type", () => {
    const state = {
      products: [],
      showProducts: true,
    };
    const action = {
      type: "default",
      payload: undefined,
    };
    // I don't think the default case is even possible with typescript...
    // @ts-ignore
    const result = productsReducer(state, action);
    expect(result).toEqual({
      products: [],
      showProducts: true,
    });
  });
});
