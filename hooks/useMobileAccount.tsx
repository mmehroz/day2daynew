import { useMemo, useCallback, useState } from "react";

export const useMobileAccount = (): [
  boolean,
  () => void,
  () => void,
  () => void
] => {
  const [show, setShow] = useState<boolean>(false);

  const memoizeShow = useMemo(() => show, [show]);

  const hideMobileAccount = useCallback(() => {
    setShow(false);
  }, [show]);

  const showMobileAccount = useCallback(() => {
    setShow(true);
  }, [show]);

  const toggleMobileAccount = useCallback(() => {
    setShow(!show);
  }, [show]);

  return [memoizeShow, hideMobileAccount, showMobileAccount, toggleMobileAccount];
};
