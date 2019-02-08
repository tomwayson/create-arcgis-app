import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import { signIn, signOut } from './utils/session';
import AppNav from './components/AppNav';
import UserMenu from './components/UserMenu';
import Home from './routes/Home';
import Items from './routes/Items';

class App extends React.Component {
  constructor(props) {
    super(props);
    // set application state
    // NOTE: when storing objects like session or user in state
    // React uses the Object.is() comparison algorithm to detect changes
    // and changes to child properties won't trigger a re-render
    // which is fine for this application, b/c we only ever set session/user
    this.state = {
      session: props.previousSession
    };
  }
  signIn = () => {
    signIn().then(session => {
      // make session available to the app
      this.setState({ session });
      // get user info
      this.initUser(session);
    });
  };
  initUser = session => {
    // fetch user info
    session.getUser().then(currentUser => {
      // make user available to the app
      this.setState({ currentUser });
    });
  };
  signOut = () => {
    // signal to app that the user has signed out
    this.setState({
      session: null,
      currentUser: null
    });
    // make sure the user is not logged in the next time they load the app
    signOut();
  };
  componentDidMount() {
    const { session } = this.state;
    if (session) {
      // we have a previously saved session, get the user info
      this.initUser(session);
    }
  }
  render() {
    const { title } = this.props;
    const { currentUser, session } = this.state;
    // NOTE: we bind the user menu and render it here
    // and pass it to the nav menu in order to avoid prop drilling
    // see: https://reactjs.org/docs/context.html#before-you-use-context
    const userMenu = (
      <UserMenu
        currentUser={currentUser}
        onSignIn={this.signIn}
        onSignOut={this.signOut}
      />
    );
    return (
      <>
        <AppNav title={title} userMenu={userMenu} />
        <div className="container mt-5">
          {/* 
            NOTE: we use render instead of component here so that we can pass in the session
            to the items route in addition to the other props passed in by react-router 
            see: https://reacttraining.com/react-router/web/api/Route/render-func
          */}
          <Route
            exact
            path="/"
            render={props => <Home {...props} title={title} />}
          />
          <Route
            path="/items"
            render={props => <Items {...props} session={session} />}
          />
        </div>
      </>
    );
  }
}

export default App;
