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
        console.log('Auth error', error.response);

        const errorList = {
          EMAIL_EXISTS:
            'The email address is already in use by another account.',
          OPERATION_NOT_ALLOWED:
            'Password sign-in is disabled for this project.',
          TOO_MANY_ATTEMPTS_TRY_LATER:
            'We have blocked all requests from this device due to unusual activity. Try again later.',
          EMAIL_NOT_FOUND:
            'There is no user record corresponding to this identifier. The user may have been deleted.',
          INVALID_PASSWORD:
            'The password is invalid or the user does not have a password.',
          USER_DISABLED:
            'The user account has been disabled by an administrator.',
        };

        let errorMessage = null;

        if (
          !Object.keys(errorList).includes(error.response.data.error.message)
        ) {
          errorMessage = 'Some error occurred';
        } else {
          errorMessage = errorList[error.response.data.error.message];
        }
        dispatch(authFail(errorMessage));
      });
  };
};
