import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";
import { ERROR_LIST } from "@/utils/constants";
import { SigninResponsePayload as LoginResponsePayload } from "@/app/api/signin/route";

type LoginParams = { email: string; password: string; isSignUp: boolean };

export type AuthState = {
  token: string | null;
  userId: string | null;
  loading: boolean;
  error: string | null;
  authRedirectUrl: string;
  expiresDate: string | null;
};

export type AuthActions = {
  login: (data: LoginParams) => Promise<void>;
  logout: () => void;
  setAuthRedirectURL: (URL: string) => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  authRedirectUrl: "/",
  expiresDate: null,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()(
    persist(
      (set, get) => ({
        ...initState,
        logout: () =>
          set({ token: null, userId: null, loading: false, error: null }),
        login: async (requestPayload) => {
          let url = `/api/signup`;

          if (!requestPayload.isSignUp) {
            url = `/api/signin`;
          }

          set({ loading: true, error: null });

          try {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                email: requestPayload.email,
                password: requestPayload.password,
                returnSecureToken: true,
              }),
            });

            if (!response.ok) {
              const errorResPayload = (await response.json()) as {
                message: keyof typeof ERROR_LIST;
              };

              let errorMessage = "Some error occurred";

              if (Object.keys(ERROR_LIST).includes(errorResPayload.message)) {
                errorMessage = ERROR_LIST[errorResPayload.message];
              } else if (errorResPayload.message) {
                errorMessage = errorResPayload.message;
              }

              set({
                error: errorMessage,
              });

              return;
            }

            const responsePayload =
              (await response.json()) as LoginResponsePayload;

            set({
              token: responsePayload.idToken,
              userId: responsePayload.localId,
              expiresDate: new Date(
                new Date().getTime() + Number(responsePayload.expiresIn) * 1000
              ).toISOString(),
            });
            //  TODO: authExpirationTime action exited here
          } catch (error) {
            set({
              error: "Some error occurred",
            });
          } finally {
            set({
              loading: false,
            });
          }
        },
        setAuthRedirectURL: (authRedirectUrl) => set({ authRedirectUrl }),
      }),
      {
        name: "auth",
        skipHydration: false,
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};
