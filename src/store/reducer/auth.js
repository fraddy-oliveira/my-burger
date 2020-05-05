import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  authRedirectUrl: '/',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, loading: true, error: null };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        loading: false,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        loading: false,
        error: null,
      };
    case actionTypes.AUTH_SET_REDIRECT_URL:
      return {
        ...state,
        authRedirectUrl: action.path,
      };
    default:
      return state;
  }
};

export default reducer;
