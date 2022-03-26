function reducer(state = { user: {}, isLoggedIn: false }, action) {
  switch (action.type) {
    case "SINGIN":
      const { user, isLoggedIn } = action.payload;  
      const timestamp = new Date().getTime() + 30*60000;
      localStorage.setItem('user', JSON.stringify({timestamp, user: user}))

      return {
        user,
        isLoggedIn,
      };
    default:
      return state;
  }
}

export default reducer;
