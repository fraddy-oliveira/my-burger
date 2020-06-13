import * as actionTypes from './actionTypes.js';

export const addIngredient = ingCode => {
  return { type: actionTypes.ADD_INGREDIENTS, ingredientCode: ingCode };
};

export const removeIngredient = ingCode => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientCode: ingCode,
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return {
    type: actionTypes.INITIALIZE_INGREDIENTS,
  };
};
