export enum API_ERROR {
  AUTH_INVALID_TOKEN = "Please provide valid bearer token.",
  AUTH_NOT_FOUND_TOKEN = "Bearer token not found.",
  AUTH_INVALID_LOGIN_FORM = "Login form is invalid",
  AUTH_INVALID_SIGNUP_FORM = "Sign up form is invalid",
  BURGER_INGREDIENTS_NOT_FOUND = "Ingredients not found.",
  ORDER_INVALID_CREATE_ORDER_PAYLOAD = "Create order payload is invalid",
  ORDER_FAILED_CREATE_ORDER = "Create order failed",
  ORDER_FAILED_TO_FETCH_ORDERS = "Failed to fetch Orders.",
  SERVER_INTERNAL_ERROR = "Oops! some error occurred.",
}
