import { useMemo, useCallback, useState } from "react";

export const useMobileCategory = (): [
  boolean,
  () => void,
  () => void,
  () => void
] => {
  const [show, setShow] = useState<boolean>(false);

  const memoizeShow = useMemo(() => show, [show]);

  const hideMobileCategory = useCallback(() => {
    setShow(false);
  }, [show]);

  const showMobileCategory = useCallback(() => {
    setShow(true);
  }, [show]);

  const toggleMobileCategory = useCallback(() => {
    setShow(!show);
  }, [show]);

  return [memoizeShow, hideMobileCategory, showMobileCategory, toggleMobileCategory];
};
