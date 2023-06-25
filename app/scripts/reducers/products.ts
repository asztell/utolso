export const initialState = {
  products: [],
  showProducts: false,
  updateShowProducts: (a) => {},
  updateProducts: (a) => {},
};

// export const productsReducer = (state = initialState, action) => {
export const productsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_PRODUCTS":
      return {
        ...state,
        products: payload,
      };
    case "UPDATE_SHOW_PRODUCTS":
      return {
        ...state,
        showProducts: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
