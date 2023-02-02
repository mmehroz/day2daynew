import { createContext } from "react";

import { FiltersProvider as ContextProvider, UserContextProps } from "@types";
import { useUser } from "@hooks";

export const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: ContextProvider) => {
  const [user, setUser, clearUser] = useUser();

  const val: UserContextProps = {
    user,
    setUser,
    clearUser,
  };

  return <UserContext.Provider value={val}>{children}</UserContext.Provider>;
};
