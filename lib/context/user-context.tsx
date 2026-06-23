"use client";

import { createContext, useContext, type ReactNode } from "react";
import { mockCurrentUser, type MockUser } from "@/lib/mock/user";

const UserContext = createContext<MockUser>(mockCurrentUser);

export function UserProvider({ children }: { children: ReactNode }) {
  return <UserContext.Provider value={mockCurrentUser}>{children}</UserContext.Provider>;
}

export function useCurrentUser() {
  return useContext(UserContext);
}
