import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  buttonGroup: {
    margin: theme.spacing(2)
  }
}));

export default function LogoSignOut() {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.paper}>
      <Button variant="constrained">Sign Out</Button>
        <img src="../quartetlogo.png" />
      </div>
    </Container>
  );
}
