import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { getAllSongs } from "../../utils/query";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  formControl: {
    margin: theme.spacing(8),
    minWidth: 200
  },
  buttonGroup: {
    margin: theme.spacing(2)
  }
}));

const ChooseSong = () => {
  const classes = useStyles();
  const [song, setSong] = useState("");
  const [state, setState] = useState({
    loading: true,
    data: null,
  });

  useEffect(() => {
    const contests = async () => {
      let { data } = await getAllSongs();
      let { midis } = data;
      setState((state) => ({ ...state, loading: false, data: midis }));
    };
    contests();
  }, []);

  const { loading, data } = state;

  const handleChange = event => {
    setSong(event.target.value);
  };

  return loading ? (<h1>Loading...</h1>) : (
    <Container>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h3">Choose your song</Typography>
        <FormControl className={classes.formControl}>
          <Select label="" value={song} onChange={handleChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {data.map((song) => (
              <MenuItem key={song.id} value={song.id}>
                {song.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Link to={{ pathname: '/record-song', state: { song: song } }}>
        <Button variant="contained" color="primary" size="large">
          Let's go
        </Button>
      </Link>

    </Container>
  );
}

export default withRouter(ChooseSong);
