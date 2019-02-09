import { actionTypes, appReducer } from './app';

describe('app reducer', function() {
  let session, user;
  beforeEach(function() {
    // set mock session & user
    session = {
      username: 'userone'
    };
    user = {
      username: 'userone',
      fullName: 'User One'
    };
  });
  test('set session', function() {
    const signedOutState = {};
    const nextState = appReducer(signedOutState, {
      type: actionTypes.setSession,
      session
    });
    expect(nextState.session).toEqual(session);
    expect(nextState.user).toBeNull();
  });
  test('set user', function() {
    const signedInNoUserState = { session };
    const nextState = appReducer(signedInNoUserState, {
      type: actionTypes.setUser,
      user
    });
    expect(nextState.session).toEqual(session);
    expect(nextState.user).toEqual(user);
  });
  test('set invalid user', function() {
    const signedInNoUserState = { session };
    const otherUser = { username: 'usertwo', fullName: 'User Two' };
    expect(() => {
      appReducer(signedInNoUserState, {
        type: actionTypes.setUser,
        user: otherUser
      });
    }).toThrowError(/Invalid user for session with username: 'userone'./);
  });
  test('sign out', function() {
    const signedInState = { session, user };
    const nextState = appReducer(signedInState, { type: actionTypes.signOut });
    expect(nextState.session).toBeNull();
    expect(nextState.user).toBeNull();
  });
  test('invalid action type', function() {
    expect(() => {
      appReducer({}, { type: 'notvalid' });
    }).toThrowError(/Invalid app action: 'notvalid'/);
  });
});
