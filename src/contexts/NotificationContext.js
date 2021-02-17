import React, { useState, createContext } from "react";
import AlertMessage from "../components/AlertMessage";

const NotificationContext = createContext(null);

function NotificationProvider({ children }) {
  const [state, setState] = useState(null);

  const onClose = () => {
    setState({ ...state, isOpen: false });
  };

  return (
    <>
      <NotificationContext.Provider value={setState}>
        {children}
      </NotificationContext.Provider>
      <AlertMessage handleClose={onClose} {...state} />
    </>
  );
}

export { NotificationContext, NotificationProvider };
