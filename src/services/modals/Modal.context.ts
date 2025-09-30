import { createContext, useContext } from "react";

interface ModalContextValue {
  id: string;
}

export const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function useModalContext() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within a ModalContext.Provider");
  }

  return context;
}