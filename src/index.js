import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { restoreSession } from './utils/session';
import * as serviceWorker from './serviceWorker';

// this file serves as the client application's entry point

// NOTE: this is a good place to do any work that would be
// done differently on the server (for server-rendered apps)
// Examples:
// - select the router component to render
// - read data (i.e. session) from cookies or local storage
// - detect the user's locale

// read the user's previous session (if any) from a cookie
const previousSession = restoreSession();

ReactDOM.render(
  <Router>
    <App previousSession={previousSession} />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
