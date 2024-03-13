"use client";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface PasswordInitialContext {
  passwords: string[];
  setPasswords: Dispatch<SetStateAction<string[]>>;
}

export const PasswordContext = createContext<PasswordInitialContext | null>(
  null,
);

export default function PasswordContextProvider({
  children,
}: PropsWithChildren) {
  const [passwords, setPasswords] = useState<string[]>([]);
  return (
    <PasswordContext.Provider
      value={{
        passwords,
        setPasswords,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
}
