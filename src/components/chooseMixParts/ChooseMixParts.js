import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { getPartRecordings } from "../../utils/query";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  paddingTopBottom: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
}));

const ChooseMixParts = ({ location }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    soprano: null,
    tenor: null,
    alto: null,
    bass: null,
    loading: true,
  });

  useEffect(() => {
    const getRecordings = async (song, part) => {
      const { data } = await getPartRecordings(song, part);
      const names = data.recordings.map((item) => item.uid);
      setState((state) => ({ ...state, [part]: names }));
    };
    getRecordings(location.state.id, "soprano");
    getRecordings(location.state.id, "tenor");
    getRecordings(location.state.id, "alto");
    getRecordings(location.state.id, "bass");
    setState((state) => ({ ...state, loading: false }));
  }, [location.state.id]);

  const handleChange = (event) => {
    console.log(event.target);
    // setSong(event.target.value);
  };
  const { soprano, tenor, alto, bass, loading } = state;
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <Container>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h3">{location.state.title}</Typography>
      </div>
      <Grid container spacing={3} className={classes.paddingTopBottom}>
        <Grid item xs={3}>
          <Typography>Soprano</Typography>
          <FormControl className={classes.formControl}>
            <Select label="" value={soprano} onChange={handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Birlinn-Soprano</MenuItem>
              <MenuItem value={20}>Morag-Soprano</MenuItem>
              <MenuItem value={30}>Uibhist-Soprano</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Typography>Tenor</Typography>
          <FormControl className={classes.formControl}>
            <Select label="" value={tenor} onChange={handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Birlinn-Tenor</MenuItem>
              <MenuItem value={20}>Morag-Tenor</MenuItem>
              <MenuItem value={30}>Uibhist-Tenor</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Typography>Alto</Typography>
          <FormControl className={classes.formControl}>
            <Select label="" value={alto} onChange={handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Birlinn-Alto</MenuItem>
              <MenuItem value={20}>Morag-Alto</MenuItem>
              <MenuItem value={30}>Uibhist-Alto</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Typography>Bass</Typography>
          <FormControl className={classes.formControl}>
            <Select label="" value={bass} onChange={handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Birlinn-Bass</MenuItem>
              <MenuItem value={20}>Morag-Bass</MenuItem>
              <MenuItem value={30}>Uibhist-Bass</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Link to="/mix-ready">
        <Button variant="contained" color="primary" size="large">
          Mix!
        </Button>
      </Link>
    </Container>
  );
};

export default withRouter(ChooseMixParts);
