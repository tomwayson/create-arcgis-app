import React, { useState, useEffect, useCallback } from 'react';
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
  // use memoized callback functions for event handlers
  // see: https://reactjs.org/docs/hooks-reference.html#usecallback
  const onSignIn = useCallback(() => {
    // make session available to the app once the user signs in
    signIn().then(setSession);
    // NOTE: I'm not sure if [setSession] is needed, but the above docs say:
    // "every value referenced inside the callback should also appear in the inputs array."
  }, [setSession]);
  const onSignOut = useCallback(() => {
    // signal to app that the user has signed out by clearing user & session
    setUser(null);
    setSession(null);
    // clear the cookie, etc.
    signOut();
    // NOTE: I'm not sure if [] is needed, but in theory
    // it causes this callback to only be created once per component instance
  }, []);
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
