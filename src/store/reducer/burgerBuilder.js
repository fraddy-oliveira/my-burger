import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENTS_PRICE = {
  salad: 0.1,
  meat: 0.7,
  cheese: 1,
  bacon: 0.9,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientCode]: state.ingredients[action.ingredientCode] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientCode],
      };

    case actionTypes.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientCode]: state.ingredients[action.ingredientCode] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientCode],
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: { ...action.ingredients },
        totalPrice: 4,
        error: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
