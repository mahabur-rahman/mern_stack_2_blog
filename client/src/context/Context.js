import { createContext, useReducer } from "react";
import UserReducer from "./Reducer";

// initialState
const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

// create a context
export const UserContext = createContext(INITIAL_STATE);

// context provider
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
