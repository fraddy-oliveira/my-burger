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
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignUp,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIALIZE_LOGOUT,
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authExpirationTime = expiryTimeSeconds => {
  return {
    type: actionTypes.AUTH_EXPIRATION_TIME,
    expiryTimeSeconds,
  };
};

export const setAuthRedirectURL = path => {
  return {
    type: actionTypes.AUTH_SET_REDIRECT_URL,
    path: path ? path : '/',
  };
};

export const checkAuthState = () => {
  return {
    type: actionTypes.AUTH_STATE_CHECK,
  };
};
