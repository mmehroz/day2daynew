import { useState, useEffect, useCallback, useMemo } from "react";

export const useSearch = (): [boolean, () => void, () => void] => {
  const [show, setShow] = useState<boolean>(false);

  const memoizeShow = useMemo(() => show, [show]);

  const showSearch = useCallback(() => {
    setShow(true);
  }, [show]);

  const hideSearch = useCallback(() => {
    setShow(false);
  }, [show]);

  return [memoizeShow, showSearch, hideSearch];
};
