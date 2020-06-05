import React from "react";
import { connect } from "react-redux";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { signOutStart } from "../../redux/user/user.actions";

const Navbar = ({ signOut, currentUser }) => {
  return (
    <Grid justify="space-between" container spacing={24}>
      <Grid item>
        <Box border={1} borderRadius="50%">
          <Typography variant="h4">Q</Typography>
        </Box>
      </Grid>
      {currentUser ? (
        <Grid item>
          <div>
            <Button raised color="accent" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        </Grid>
      ) : null}
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutStart()),
});

export default connect(null, mapDispatchToProps)(Navbar);
