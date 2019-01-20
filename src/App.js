import React from 'react';
import { Route } from 'react-router-dom';
import { UserSession } from '@esri/arcgis-rest-auth';
import './App.scss';
import AppNav from './components/AppNav';
import UserMenu from './components/UserMenu';
import Home from './routes/Home';
import Items from './routes/Items';

function getSessionFromLocalStorage () {
  const serializedSession = window && window.localStorage && window.localStorage.getItem('CAA_SESSION');
  const session = serializedSession && UserSession.deserialize(serializedSession);
  return session;
}

// save session & user for next time the user loads the app
function saveSessionToLocalStorage (session) {
  if (!session || !window || !window.localStorage) {
    return;
  }
  window.localStorage.setItem('CAA_SESSION', session.serialize());
}

function removeSessionFromLocalStorage() {
  if (!window || !window.localStorage) {
    return;
  }
  window.localStorage.removeItem('CAA_SESSION');
}

class App extends React.Component {
  constructor(props) {
    super(props)

    // initialize app from previous session (if any)
    const session = getSessionFromLocalStorage();
    this.state = {
      session
    };
  }
  signIn = () => {
    // sign in
    UserSession.beginOAuth2({
      // TODO: get clientId from config
      clientId: 'EICkmTOXkBhPwIRp',
      popup: true,
      redirectUri: `${window.location.origin}/redirect.html`
    })
    .then(session => {
      // make session available to the app
      this.setState({ session });
      // save session for next time the user loads the app
      saveSessionToLocalStorage(session);
      // get user info
      this.initUser(session);
    });
  }
  initUser = (session) => {
    // fetch user info
    session.getUser()
    .then(currentUser => {
      // make user available to the app
      this.setState({ currentUser });
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
  componentDidMount () {
    const {
      session
    } = this.state;
    if (session) {
      // we have a previously saved session, get the user info
      this.initUser(session);
    }
  }
  render () {
    const { currentUser } = this.state;
    // NOTE: we bind the user menu and render it here 
    // and pass it to the nav menu in order to avoid prop drilling
    // see: https://reactjs.org/docs/context.html#before-you-use-context
    const userMenu =  (<UserMenu currentUser={currentUser} onSignIn={this.signIn} onSignOut={this.signOut} />);
    return (
      <>
        <AppNav userMenu={userMenu} />
        <div className="container mt-5">
          <Route exact path="/" component={Home} />
          <Route path="/items" component={Items} />
        </div>
      </>
    );  
  }
}

export default App;
