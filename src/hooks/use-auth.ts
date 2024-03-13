"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

export default function useAuth() {
  const authCtx = useContext(AuthContext);
  if (!authCtx) {
    throw new Error("Auth Context provider not found!");
  }

  return authCtx;
}
