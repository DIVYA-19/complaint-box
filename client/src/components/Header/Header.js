import "./Header.css";
import Grid from "@mui/material/Grid";

const Header = () => {
  return (
    <div className="Header">
      <Grid container alignItems="end" justifyContent="center">
        <Grid item md={2} xs={6} id="logo" textAlign={'start'}>
          Logo
        </Grid>
        <Grid item md={8} xs={6} className="tabs">
          <div className="tab">
            Dashboard
          </div>
          <div className="tab" style={{width: '100px'}}>
            Analyze complaints
          </div>
        </Grid>
        <Grid item md={2} xs={12} textAlign={'end'} className="account-sec">
          Account
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
