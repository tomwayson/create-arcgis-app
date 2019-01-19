import React from 'react';
import { Route } from 'react-router-dom';
import { UserSession } from '@esri/arcgis-rest-auth';
import './App.scss';
import AppNav from './components/AppNav';
import Home from './routes/Home';
import Items from './routes/Items';

function getSessionFromLocalStorage () {
  const serializedSession = window && window.localStorage && window.localStorage.getItem('CAA_SESSION');
  const session = serializedSession && UserSession.deserialize(serializedSession);
  const serializedUser = session && window.localStorage.getItem('CAA_USER');
  const currentUser = serializedUser && JSON.parse(serializedUser);
  return {
    session,
    currentUser
  };
}

// save session & user for next time the user loads the app
function saveSessionToLocalStorage (session, currentUser) {
  if (!window || !window.localStorage) {
    return;
  }
  window.localStorage.setItem('CAA_SESSION', session.serialize());
  window.localStorage.setItem('CAA_USER', JSON.stringify(currentUser));
}

function removeSessionFromLocalStorage() {
  if (!window || !window.localStorage) {
    return;
  }
  window.localStorage.removeItem('CAA_SESSION');
  window.localStorage.removeItem('CAA_USER');
}

class App extends React.Component {
  constructor(props) {
    super(props)

    // initialize app from previous session (if any)
    const { session, currentUser } = getSessionFromLocalStorage();
    this.state = {
      session,
      currentUser
    };
  }
  signIn = () => {
    // sign in
    UserSession.beginOAuth2({
      clientId: 'EICkmTOXkBhPwIRp',
      popup: true,
      redirectUri: `${window.location.origin}/redirect.html`
    })
    .then(this.initSession);
  }
  initSession = (session) => {
    // make session available to the app
    this.setState({ session });    
    // fetch user info
    return session.getUser()
    .then(currentUser => {
      // make user available to the app
      this.setState({ currentUser });
      // save session & user for next time the user loads the app
      saveSessionToLocalStorage(session, currentUser);
    });  
  }
  signOut = () => {
    // signal to app that the user has signed out
    this.setState({
      session: null,
      currentUser: null
    });
    // make sure the user is not logged in the next time they load the app
    removeSessionFromLocalStorage();
  }
  render () {
    const { currentUser } = this.state;
    return (
      <>
        <AppNav currentUser={currentUser} onSignIn={this.signIn} onSignOut={this.signOut} />
        <div className="container mt-5">
          <Route exact path="/" component={Home} />
          <Route path="/items" component={Items} />
        </div>
      </>
    );  
  }
}

export default App;
