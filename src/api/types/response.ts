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
