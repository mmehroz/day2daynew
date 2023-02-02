import { createContext } from "react";
import {
  useHeader,
  useLogin,
  useMobileAccount,
  useMobileCategory,
  useModal,
  useSearch,
} from "@hooks";

import type {
  FiltersProvider as ContextProvider,
  ModalContextProps,
} from "@types";

export const UiConext = createContext<ModalContextProps>(null);

export const UiProvider = ({ children }: ContextProvider) => {
  const [show, message, showModal, modalType] = useModal();
  const [searchState, showSearch, hideSearch] = useSearch();
  const [showlogin, showLogin, hideLogin] = useLogin();
  const [headerState, showHeader, hideHeader] = useHeader();
  const [
    mobileAccountState,
    hideMobieAccount,
    showMobileAccount,
    toggleMobileAccount,
  ] = useMobileAccount();
  const [
    mobileCategoryState,
    hideMobileCategory,
    showMobileCategory,
    toggleMobileCategory,
  ] = useMobileCategory();

  const val: ModalContextProps = {
    show,
    message,
    mobileCategoryState,
    modalType: modalType,
    searchState,
    mobileAccountState,
    loginState: showlogin,
    headerState,
    showModal,
    showSearch,
    hideSearch,
    showLogin,
    hideLogin,
    showHeader,
    hideHeader,
    showMobileAccount,
    hideMobileAccount: hideMobieAccount,
    toggleMobileAccount,
    hideMobileCategory,
    showMobileCategory,
    toggleMobileCategory,
  };

  return <UiConext.Provider value={val}>{children}</UiConext.Provider>;
};
