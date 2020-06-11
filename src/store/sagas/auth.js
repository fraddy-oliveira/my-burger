import { put, delay } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';
import * as ls from '../../utils/localStorage.js';

export function* logout(action) {
  yield ls.resetUserStorage();
  yield put(actions.logoutSuccess());
}

export function* authExpirationTime(action) {
  yield delay(action.expiryTimeSeconds * 1000);
  yield put(actions.logout());
}

export function* auth(action) {
  const data = {};
  data.email = action.email;
  data.password = action.password;
  data.returnSecureToken = true;

  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmkLBPWHuVuodRcrVaKhz5oUB9xYkkP84';

  if (!action.isSignUp) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmkLBPWHuVuodRcrVaKhz5oUB9xYkkP84';
  }

  yield put(actions.authStart());

  try {
    const response = yield axios.post(url, data);

    const { idToken, localId, expiresIn } = response.data;

    yield ls.updateStorage({
      token: idToken,
      userId: localId,
      expiresDate: new Date(
        new Date().getTime() + expiresIn * 1000
      ).toISOString(),
    });

    yield put(actions.authSuccess(idToken, localId));
    yield put(actions.authExpirationTime(expiresIn));
  } catch (error) {
    const errorList = {
      EMAIL_EXISTS: 'The email address is already in use by another account.',
      OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
      TOO_MANY_ATTEMPTS_TRY_LATER:
        'We have blocked all requests from this device due to unusual activity. Try again later.',
      EMAIL_NOT_FOUND:
        'There is no user record corresponding to this identifier. The user may have been deleted.',
      INVALID_PASSWORD:
        'The password is invalid or the user does not have a password.',
      USER_DISABLED: 'The user account has been disabled by an administrator.',
    };

    let errorMessage = null;

    if (!Object.keys(errorList).includes(error.response.data.error.message)) {
      errorMessage = 'Some error occurred';
    } else {
      errorMessage = errorList[error.response.data.error.message];
    }
    yield put(actions.authFail(errorMessage));
  }
}
