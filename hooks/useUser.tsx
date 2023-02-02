import { CurrentUserProps } from "@types";
import { useMemo, useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { auth, onAuthStateChanged } from "@firebase";

export const useUser = (): [
  CurrentUserProps,
  (user: CurrentUserProps) => void,
  () => void
] => {
  const router = useRouter();

  const [user, setUser] = useState<CurrentUserProps>({
    name: null,
    email: null,
    number: null,
    imageURI: null,
    isExists: null,
  });

  const memoizeUser = useMemo(() => user, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user?.displayName,
          email: user?.email,
          isExists: true,
        });
        // console.log("firebase user 32: ", user)
      } else {
        setUser((prev) => {
          return { ...prev, isExists: false };
        });
      }
    });
  }, [router?.query]);

  const forceSetUser = useCallback(
    (user: CurrentUserProps) => {
      setUser({ ...user });
    },
    [user]
  );

  const clearUser = useCallback(() => {
    setUser({
      name: null,
      email: null,
      number: null,
      imageURI: null,
      isExists: false,
    });
  }, [user]);

  return [memoizeUser, forceSetUser, clearUser];
};
