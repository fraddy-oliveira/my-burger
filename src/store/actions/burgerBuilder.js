import * as actionTypes from './actionTypes.js';

import axios from '../../axios-orders';

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
  return dispatch => {
    axios
      .get('/ingredients.json')
      .then(response => {
        if (response && response.data) {
          dispatch(setIngredients(response.data));
          //dispatch(fetchIngredientsFailed());
        } else {
          dispatch(fetchIngredientsFailed());
        }
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
