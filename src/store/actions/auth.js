import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    const data = {};
    data.email = email;
    data.password = password;
    data.returnSecureToken = true;

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmkLBPWHuVuodRcrVaKhz5oUB9xYkkP84';

    if (!isSignUp) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmkLBPWHuVuodRcrVaKhz5oUB9xYkkP84';
      delete data.returnSecureToken;
    }

    dispatch(authStart());
    axios
      .post(url, data)
      .then(data => {
        console.log('auth response', data);
        const { idToken, localId } = data.data;
        dispatch(authSuccess(idToken, localId));
      })
      .catch(error => {
        console.log('auth error', error);
        dispatch(authFail('auth failed'));
      });
  };
};
