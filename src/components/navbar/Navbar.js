import React from "react";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import './style.css'
import { signOutStart } from "../../redux/user/user.actions";

const Navbar = ({ signOut, currentUser }) => {
  return (
    <div class="navbar">
    <Grid justify="space-between" container spacing={3}>
      <Grid item>
      <img src="../quartetlogo.png" height="80"/>  
      </Grid>
      {currentUser ? (
        <Grid item>
            <Button variant="contained" color="primary" onClick={() => signOut()}>
              Sign Out
            </Button>
        </Grid>
      ) : null}
    </Grid>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutStart()),
});

export default connect(null, mapDispatchToProps)(Navbar);
