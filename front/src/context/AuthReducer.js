const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
    case "UPDATE_USER":
      console.log(action);
      localStorage.setItem("user", JSON.stringify(action.payload));
      //saving the user to localStorage
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      //removing the user from localStorage
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user, //take all properties inside of user and paste inside
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
