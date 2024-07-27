export type ThirdPartyApiErrorResponse = {
  error: {
    code: number;
    message: string;
    errors: {
      message: string;
      domain: string;
      reason: string;
    }[];
    status: string;
    details: {
      "@type": string;
      reason: string;
      domain: string;
      metadata: { service: string };
    }[];
  };
};

type Errors = { message: string; field: string }[];

export type APIResponseSuccess<T> = T;

export type APIResponseError<E = Errors> = {
  message: string;
  errorCode?: string;
  errors?: E;
};

export type APIResponse<T, E = null> =
  | APIResponseSuccess<T>
  | APIResponseError<E>;
