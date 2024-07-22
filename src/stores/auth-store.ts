import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";

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
        logout: () => set({ ...initState }),
        login: async (requestPayload) => {
          let url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/signup`;

          if (!requestPayload.isSignUp) {
            url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/signin`;
          }

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
              const errorResPayload = await response.json();

              set({
                error: (errorResPayload as any).error.message,
              });

              return;
            }

            const responsePayload = await response.json();

            set({
              token: responsePayload.idToken,
              userId: responsePayload.localId,
              expiresDate: new Date(
                new Date().getTime() + responsePayload.expiresIn * 1000
              ).toISOString(),
            });
          } catch (error) {
            set({
              error: "Some error occurred",
            });
          }
        },
      }),
      {
        name: "auth",
        skipHydration: false,
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};
