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

const addIngredients = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientCode]: state.ingredients[action.ingredientCode] + 1,
    },
    totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientCode],
  };
};

const removeIngredients = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientCode]: state.ingredients[action.ingredientCode] - 1,
    },
    totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientCode],
  };
};

const setIngredients = (state, action) => {
  return {
    ...state,
    ingredients: { ...action.ingredients },
    totalPrice: 4,
    error: false,
  };
};

const fetchIngredientsFailed = (state, action) => {
  return {
    ...state,
    error: true,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return addIngredients(state, action);
    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredients(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
