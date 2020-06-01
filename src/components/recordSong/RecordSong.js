import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';

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
    }
}));

export default function RecordSong() {
    const classes = useStyles();
    const muiTheme = createMuiTheme({});
    return (
        <Container>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography variant="h1">Record Song</Typography>
                <Typography variant="h2">Title</Typography>
                <br />
                <Button variant="contained" color="primary">Record</Button>
                <br />
                <Button variant="contained" color="primary">Reset</Button>   
                <br /><br />             
                <ThemeProvider theme={muiTheme}>
                <AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
                </ThemeProvider>
            </div>
            
        </Container>
    )
}