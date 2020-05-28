// Import react and utilities
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// Import global styles
import './App.css';
// Impoort the page components
import Landing from './components/landing/Landing';
import Dashboard from './components/dashboard/Dashboard';
import ChooseSong from './components/chooseSong/ChooseSong';
import UploadMidi from './components/uploadMidi/UploadMidi';

function App() {
  return (
    <div className="App" >
      <Router>
        <div>
          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/choose-song">
              <ChooseSong />
            </Route>
            <Route path="/upload-midi">
              <UploadMidi />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;