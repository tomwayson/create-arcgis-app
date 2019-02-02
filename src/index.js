// NOTE: this file serves as the client application's entry point
// this is a good place to do any work that would be
// done differently on the server (for server-rendered apps)
// Examples:
// - select the router component to render
// - read data (i.e. session) from cookies or local storage
// - detect the user's locale

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { restoreSession } from './utils/session';
import * as serviceWorker from './serviceWorker';

// read the user's previous session (if any) from a cookie
// and pass that into the application
const previousSession = restoreSession();
// NOTE: this is set in public/index.html
const title = document.title;
ReactDOM.render(
  <Router>
    <App previousSession={previousSession} title={title} />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
