import React, { createContext, useState } from "react";

export const LoginContext = createContext({});

function LoginContextProvider({ children }) {
  const [token, setToken] = useState("");

  return (
    <LoginContext.Provider value={{ setToken }}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;
