// Import react and utilities
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// Import global styles
import "./App.css";
// Impoort the page components
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import ChooseSong from "./components/chooseSong/ChooseSong";
import UploadMidi from "./components/uploadMidi/UploadMidi";
import RecordSong from "./components/recordSong/RecordSong";
import LogoSignOut from "./components/logoSignOut/LogoSignOut";
import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";

function App({ currentUser, checkUserSession }) {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  return (
    <div className="App">
      <Router>
        <div>
          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <LogoSignOut />
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                currentUser ? <Redirect to="/dashboard" /> : <Landing />
              }
            />
            <Route
              path="/dashboard"
              render={() => (currentUser ? <Dashboard /> : <Redirect to="/" />)}
            />
            <Route
              path="/choose-song"
              render={() =>
                currentUser ? <ChooseSong /> : <Redirect to="/" />
              }
            />
            <Route
              path="/upload-midi"
              render={() =>
                currentUser ? <UploadMidi /> : <Redirect to="/" />
              }
            />
            <Route
              path="/record-song"
              render={() =>
                currentUser ? <RecordSong /> : <Redirect to="/" />
              }
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
