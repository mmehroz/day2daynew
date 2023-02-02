import { useState, useCallback, useMemo } from "react";

export const useModal = (): [
  boolean,
  string,
  (message: string, type?: "error" | "success") => void,
  "success" | "error"
] => {
  const [modalState, setModalState] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  const memoizeState = useMemo(() => modalState, [modalState]);

  const showModal = useCallback(
    (message: string, type?: "error" | "success") => {
      let timeoutid: any;
      setModalState({
        show: true,
        message: message,
        type: type,
      });

      if (timeoutid) {
        clearTimeout(timeoutid);
      }

      timeoutid = setTimeout(() => {
        setModalState({
          show: false,
          message: "",
          type: "success",
        });
      }, 3000);

      return () => {
        clearTimeout(timeoutid);
      };
    },
    [modalState]
  );

  return [
    memoizeState.show,
    memoizeState.message,
    showModal,
    memoizeState?.type,
  ];
};
