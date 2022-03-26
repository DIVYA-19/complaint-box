import { Navigate, Outlet, useLocation } from "react-router-dom";
import { connect } from 'react-redux'

function RequireAuth({ isLoggedIn }) {
    let location = useLocation();
    let user = localStorage.getItem('user');
    user = JSON.parse(user);

    if (!user) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/signin" state={{ from: location }} />;
    }
  
    return <Outlet />;
  }

  function mapStateToProps(state, props) {
    console.log("in require auth", state)
    return {
      isLoggedIn: state.data.isLoggedIn
    }
  }

  export default connect(mapStateToProps)(RequireAuth);