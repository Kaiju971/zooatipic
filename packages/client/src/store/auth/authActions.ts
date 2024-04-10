export enum AuthActionEnum {
  LOG_IN = "LOG_IN",
  LOG_OUT = "LOG_OUT",
}

export type AuthAction =
  | {
      type: AuthActionEnum.LOG_IN;
      payload: {
        role: string;
        authToken: string;
        userId: string;
        email: string;
        nom: string;
        prenom: string;
        id_role: number;
      };
    }
  | {
      type: AuthActionEnum.LOG_OUT;
      payload: null;
    };
