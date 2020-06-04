import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

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

export default function UploadMidi() {
    const classes = useStyles();
    return (
        <Container>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography variant="h1">Upload Midi File</Typography>
                <FormControl className={classes.formControl}>
                    <TextField id="title" variant="outlined" fullWidth label="Title" />
                </FormControl>
                <Button>Upload</Button>
            </div>
        </Container>
    )
}