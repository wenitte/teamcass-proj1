import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import AudioPlayer from "material-ui-audio-player";
const audioType = "audio/wav";

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

class RecordSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      audios: [],
      part: ''
    };
    this.updatePart = this.updatePart.bind(this);
  }

  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // show it to user
    this.audio.srcObject = stream;
    // this.audio.play();
    // init recording
    this.mediaRecorder = new MediaRecorder(stream);
    // init data storage for video chunks
    this.chunks = [];
    this.bgAudio = new Audio("http://localhost:8000/midi/suas_leis.mp3");
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
  }

  startRecording(e) {
    e.preventDefault();
    this.bgAudio.play();
    // wipe old data chunks
    this.chunks = [];
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);
    // say that we're recording
    this.setState({ recording: true });
  }

  stopRecording(e) {
    e.preventDefault();
    this.bgAudio.pause();
    // stop the recorder
    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({ recording: false });
    // save the video to memory
    this.saveAudio();
  }

  saveAudio() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, { type: audioType });
    // generate video url from blob
    const audioURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    const audios = this.state.audios.concat([{ url: audioURL, blob: blob }]);
    this.setState({ audios });
    console.log(audios);
  }
  uploadAudio(audio) {
    console.log(`Blob is: - ${audio}`);
    var formData = new FormData();
    formData.append("recording", audio);
    formData.append("songID", "uibhist_mo_ghraidh");
    formData.append("uid", "adam");
    formData.append("partID", this.state.part);
    axios.post("http://localhost:8000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    // .then(() => {
    //   this.props.history.push('/clip-saved');
    // });
  }
  deleteAudio(audioURL) {
    // filter out current videoURL from the list of saved videos
    const audios = this.state.audios.filter(a => a !== audioURL);
    this.setState({ audios });
  }
  updatePart(part) {
    this.setState({ part });
  }
  updatePart(event) {
    this.setState({ part: event.target.value });
  }

  render() {
    const { recording, audios, part } = this.state;

    return (
      <Container>
        <CssBaseline />

        <Grid container justify="center">
          <Grid item sm={6}>
            <Typography variant="h3">Choose Role</Typography>
            <FormControl>
              <Select value={part} onChange={this.updatePart}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="soprano">Soprano</MenuItem>
                <MenuItem value="alto">Alto</MenuItem>
                <MenuItem value="tenor">Tenor</MenuItem>
                <MenuItem value="bass">Bass</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <Typography variant="h3">Record {part.charAt(0).toUpperCase() + part.slice(1)} Part</Typography>
            <div >
              <audio
                style={{ width: 400 }}
                ref={a => {
                  this.audio = a;
                }}
              >
                <p>Audio stream not available. </p>
              </audio>
              <div>
                {!recording && (
                  <Button variant="contained" color="primary" onClick={e => this.startRecording(e)}>Record</Button>
                )}
                {recording && (
                  <Button variant="contained" color="primary" onClick={e => this.stopRecording(e)}>Stop</Button>
                )}
              </div>
              {/* <Link to="/clip-saved">
                <Button
                  style={{ marginTop: "2rem" }}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </Link> */}
              <div>
                <h3>Recorded audios:</h3>
                {audios.map((audio, i) => (
                  <div key={`audio_${i}`}>
                    <audio controls style={{ width: 200 }} src={audio.url} />
                    <div>
                      <Button variant="contained" color="primary" onClick={() => this.deleteAudio(audio)}>Delete</Button>
                    </div>
                    <div>
                      <Button variant="contained" color="primary" style={{ marginTop: "2rem" }} onClick={() => this.uploadAudio(audio.blob)}>Upload</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default RecordSong;
