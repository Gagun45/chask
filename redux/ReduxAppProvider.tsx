"use client";

import { type ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

interface Props {
  children: ReactNode;
}

const ReduxAppProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};
export default ReduxAppProvider;
