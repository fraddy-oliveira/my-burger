export default class APIError extends Error {
  readonly statusCode: number;

  readonly errorCode?: string;

  readonly errors?: any[];

  constructor(
    message: string,
    statusCode: number = 500,
    errorCode?: string,
    errors?: any[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors;
  }
}
