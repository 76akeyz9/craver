export const initialState = {
  basket: {},
  user: null,
  postData: {},
};

// Selector, Calcurator
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: {
          id: action.item.id,
          image: action.item.image,
        },
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_POSTDATA":
      return {
        ...state,
        postData: {
          id: action.item.id,
          imageUrl: action.item.imageUrl,
          caption: action.item.caption,
        },
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};

export default reducer;
