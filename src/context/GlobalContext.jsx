/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  userInfo: null,
  updateResponse: false,
};

const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const setUserInfo = (userInfo) => {
    dispatch({
      type: "SET_USER_INFO",
      payload: userInfo,
    });
  };
  const setUpdateResponse = (updateResponse) => {
    dispatch({
      type: "SET_UPDATE_RESPONSE",
      payload: updateResponse,
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        userInfo: state.userInfo,
        setUserInfo,
        updateResponse: state.updateResponse,
        setUpdateResponse,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
