import { UserSession } from '@esri/arcgis-rest-auth';
import * as Cookies from 'js-cookie';

// TODO: should we get these from from config?
const SESSION_COOKIE_NAME = 'caa_session';
const CLIENT_ID = 'EICkmTOXkBhPwIRp';
// TODO: portal URL?

/**
 * sign in using OAuth pop up
 */
export function signIn () {
  return UserSession.beginOAuth2({
    clientId: CLIENT_ID,
    popup: true,
    redirectUri: `${window.location.origin}/redirect.html`
  })
  .then(session => {
    // save session for next time the user loads the app
    saveSession(session);
    return session;
  });
}

/**
 * make sure the user is not logged in the next time they load the app
 */
export function signOut ()  {
  deleteSession();
}

// restore a previously saved session
export function restoreSession () {
  const serializedSession = Cookies.get(SESSION_COOKIE_NAME);
  const session = serializedSession && UserSession.deserialize(serializedSession);
  return session;
}

// save session & user for next time the user loads the app
function saveSession (session) {
  // get expiration from session
  const expires = session.tokenExpires;
  Cookies.set(SESSION_COOKIE_NAME, session.serialize(), { expires });
}

// delete a previously saved session
function deleteSession () {
  Cookies.remove(SESSION_COOKIE_NAME);
}
