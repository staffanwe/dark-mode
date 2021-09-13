import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState();
  const [mode, setMode] = useState(Math.round(Math.random()) === 1 ? 'dark' : 'light');

  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };
  return <UserContext.Provider value={{ user, setUser, mode, toggleMode }}>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;
