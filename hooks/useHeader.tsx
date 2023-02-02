import { useState, useCallback } from "react";

export const useHeader = (): [boolean, () => void, () => void] => {
  const [show, setShow] = useState<boolean>(false);

  const showHeader = useCallback(() => {
    setShow(false);
  }, [show]);

  const hideHeader = useCallback(() => {
    // console.log("hide header: ", show);
    setShow(true);
  }, [show]);

  return [show, showHeader, hideHeader];
};
