import React, { useState } from "react";

const INITIAL_GLB_STATE = {
  taskStatuses: [
    { name: "TODO", value: "TODO" },
    { name: "IN PROGRESS", value: "INPROGRESS" },
    { name: "DONE", value: "DONE" },
  ],
};

export const GlobalContext = React.createContext(INITIAL_GLB_STATE);

const Store = ({ children }) => {
  const [glbState, setGlbState] = useState(INITIAL_GLB_STATE);

  return (
    <GlobalContext.Provider value={[glbState, setGlbState]}>
      {children}
    </GlobalContext.Provider>
  );
};

export default Store;
