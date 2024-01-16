import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const getInitialUser = () => {
  //if user exists in localStorage, return the user:
  const localUser = localStorage.getItem("user");
  console.log(localUser);
  if (localUser) return JSON.parse(localUser);
  //if user is not in localStorage, return blank user object (such as null user below)
  return {
    id: null, // You can add more user properties if needed
    username: null,
    seenPosts: [], // Add the seenPosts array
  };
};

const INITIAL_STATE = {
  user: getInitialUser(),
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
