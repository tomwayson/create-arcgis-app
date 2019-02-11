export const actionTypes = {
  setSession: 'SET_SESSION',
  setUser: 'SET_USER',
  signOut: 'SIGN_OUT'
};

export function appReducer(state, action) {
  switch (action.type) {
    case actionTypes.setSession:
      return { ...state, session: action.session, user: null };
    case actionTypes.setUser:
      // first validate that user matches session username
      const user = action.user;
      const sessionUsername = state.session && state.session.username;
      if (user.username !== sessionUsername) {
        throw new Error(
          `Invalid user for session with username: '${sessionUsername}'.`
        );
      }
      return { ...state, user: action.user };
    case actionTypes.signOut:
      return { ...state, session: null, user: null };
    default:
      throw new Error(`Invalid app action: '${action.type}'.`);
  }
}
