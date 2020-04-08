import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    cheese: 0,
    bacon: 0,
  },
  totalPrice: 4,
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

    default:
      return state;
  }
};

export default reducer;
