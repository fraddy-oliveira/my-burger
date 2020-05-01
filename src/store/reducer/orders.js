import * as actionTypes from './../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrderData = {
        ...action.orderData,
        orderId: action.orderId,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrderData),
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
