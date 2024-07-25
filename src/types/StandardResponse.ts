type StandardError = {
  message: string;
  statusCode: number;
};

export const internalError = {
  error: {
    message: "Oops! Something Went Wrong",
    statusCode: 0,
  },
};

export type StandardResponseSuccess<T> = { data: T };

export type StandardResponseError = { error: StandardError };

export type StandardResponse<T> =
  | StandardResponseSuccess<T>
  | StandardResponseError;
