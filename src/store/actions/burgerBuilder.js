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
