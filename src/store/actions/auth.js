import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    auth: authData,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password) => {
  return dispatch => {
    const data = {};
    data.email = email;
    data.password = password;
    data.returnSecureToken = true;

    const headers = {};

    dispatch(authStart());
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmkLBPWHuVuodRcrVaKhz5oUB9xYkkP84',
        data
      )
      .then(data => {
        console.log('auth response', data);
        dispatch(authSuccess(data));
      })
      .catch(error => {
        console.log('auth error', error);
        dispatch(authFail('auth failed'));
      });
  };
};
