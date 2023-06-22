export const initialState = {
  products: [],
};

const productsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_PRODUCTS":
      return {
        ...state,
        products: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

export default productsReducer;
