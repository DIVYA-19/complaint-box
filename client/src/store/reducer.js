function reducer(state = { user: {}, isLoggedIn: false }, action) {
  switch (action.type) {
    case "SINGIN":
      const { user, isLoggedIn } = action.payload;  
      console.log(action.payload)   

      return {
        user,
        isLoggedIn,
      };
    default:
      return state;
  }
}

export default reducer;
