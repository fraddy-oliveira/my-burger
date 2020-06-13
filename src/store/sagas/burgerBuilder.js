import { call, put } from 'redux-saga/effects';

import * as actions from '../actions/index.js';
import axiosOrders from '../../axios-orders';

export function* initIngredients(action) {
  try {
    const response = yield call(axiosOrders.get, '/ingredients.json');

    if (response && response.data) {
      yield put(actions.setIngredients(response.data));
    } else {
      yield put(actions.fetchIngredientsFailed());
    }
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
}
