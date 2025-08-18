const Auth = (state, action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "SET_UPDATE_RESPONSE":
      return {
        ...state,
        updateResponse: action.payload,
      };
    case "SET_UNREAD_MESSAGES":
      return {
        ...state,
        unreadMessages: action.payload,
      };
    default:
      return state;
  }
};
export default Auth;
