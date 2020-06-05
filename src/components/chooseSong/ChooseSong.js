import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";

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

export default function ChooseSong() {
  const classes = useStyles();
  const [song, setSong] = React.useState("");

  const handleChange = event => {
    setSong(event.target.value);
  };

  return (
    <Container>
      <CssBaseline />
      <div className={classes.paper}>
        <FormControl className={classes.formControl}>
          <InputLabel>Choose Song</InputLabel>
          <Select label="" value={song} onChange={handleChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Birlinn</MenuItem>
            <MenuItem value={20}>Morag</MenuItem>
            <MenuItem value={30}>Uibhist</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.buttonGroup}>
        <Typography variant="h6">Choose Role</Typography>
        <ButtonGroup
          size="large"
          color="primary"
          aria-label="outlined primary button group"
        >
          <Button>Soprano</Button>
          <Button>Tenor</Button>
          <Button>Alto</Button>
          <Button>Bass</Button>
        </ButtonGroup>
      </div>
    </Container>
  );
}
