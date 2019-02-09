import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import { signIn, signOut } from './utils/session';
import AppNav from './components/AppNav';
import UserMenu from './components/UserMenu';
import Home from './routes/Home';
import Items from './routes/Items';

function App({ previousSession, title }) {
  // hooks
  // NOTE: when storing objects like session or user in state
  // React uses the Object.is() comparison algorithm to detect changes
  // and changes to child properties won't trigger a re-render
  // which is fine for this application, b/c we only ever set session/user
  const [session, setSession] = useState(previousSession);
  const [user, setUser] = useState();
  useEffect(() => {
    if (session && !user) {
      // session has been initialized, but we don't have the user info yet
      // fetch user info and make available to the app as state
      session.getUser().then(setUser);
    }
  }, [session]);
  // use inline functions for event handlers, and yes, thats OK
  // see: https://reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render
  // and: https://cdb.reacttraining.com/react-inline-functions-and-performance-bdff784f5578
  function onSignIn() {
    // make session available to the app once the user signs in
    signIn().then(setSession);
  }
  function onSignOut() {
    // signal to app that the user has signed out by clearing user & session
    setUser(null);
    setSession(null);
    // clear the cookie, etc.
    signOut();
  }
  // NOTE: we bind the user menu and render it here
  // and pass it to the nav menu in order to avoid prop drilling
  // see: https://reactjs.org/docs/context.html#before-you-use-context
  const userMenu = (
    <UserMenu currentUser={user} onSignIn={onSignIn} onSignOut={onSignOut} />
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

export default App;
