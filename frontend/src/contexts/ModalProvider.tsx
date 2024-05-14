import { createContext, useState } from "react";

export const ModalContext = createContext<any>(null);

// Create a provider component
export const ModalProvider = ({ children }: any) => {
  // Define state or functions you want to pass down
  const [count, setCount] = useState<number>(0);
  const [shouldClose, setShouldClose] = useState<boolean[]>([]);
  const [shouldModalShow, setShouldModalShow] = useState<boolean[]>([false]);

  const closeModal = (index?: number, callBack?: any) => {
    let updatedModals = [...shouldClose];
    updatedModals[index|| 0] = true;
    setShouldClose(updatedModals);
    setTimeout(() => {
      updatedModals[index || 0] = false;
      setShouldClose(updatedModals);

      if (callBack) {
        callBack();
      }
      updatedModals = [...shouldModalShow];
      updatedModals[index || 0] = false;
      setShouldModalShow(updatedModals);

      setShouldClose([]);
    }, 100);
  };

  const openModal = (index?: number) => {
    setShouldModalShow((prev: any) => {
      const updated = [...prev];
      updated[index ||0] = true;
      return updated;
    });
  };

  // Provide the state and functions using the context provider
  return (
    <ModalContext.Provider
      value={{
        shouldModalShow,
        setShouldModalShow,
        shouldClose,
        setShouldClose,
        closeModal,
        openModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
