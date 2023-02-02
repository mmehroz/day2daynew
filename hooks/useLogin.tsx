import { useState, useEffect, useCallback, useMemo } from "react";

export const useLogin = (): [boolean, () => void, () => void] => {
  const [show, setShow] = useState<boolean>(false);

  const memoizeShow = useMemo(() => show, [show]);

  const showLogin = useCallback(() => {
    setShow(true);
  }, [show]);

  const hideLogin = useCallback(() => {
    setShow(false);
  }, [show]);

  return [memoizeShow, showLogin, hideLogin];
};
