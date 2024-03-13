"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface AuthType {
  email: string;
  password: string;
  isAuthorized: boolean;
}

interface AuthInitialContext {
  auth: AuthType;
  setAuth: Dispatch<SetStateAction<AuthType>>;
}

export const AuthContext = createContext<AuthInitialContext | null>(null);

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [auth, setAuth] = useState<AuthType>({
    email: "",
    password: "",
    isAuthorized: false,
  });
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
