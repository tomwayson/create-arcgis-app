import React from 'react';
import { render, wait } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

describe('smoke tests', function () {
  describe('w/o a previous session', function () {
    it('renders app title and sign in button', () => {
      const { getByText } = render(<Router><App /></Router>);
      expect(getByText('Ambitious ArcGIS App')).toBeInTheDocument();
      expect(getByText('Sign In')).toBeInTheDocument();
    });
  });
  describe('w/ a previous session', function () {
    it('renders app title and sign in button', () => {
      // mock previous session
      const previousSession = {
        getUser: () => {
          return Promise.resolve({
            fullName: 'Tom Wayson'
          });
        }
      }
      const { queryByText } = render(<Router><App previousSession={previousSession} /></Router>);
      expect(queryByText('Sign In')).toBeTruthy();
      return wait(() => expect(queryByText('Sign In')).toBeNull())
      .then(() => {
        expect(queryByText('Tom Wayson')).toBeTruthy();
      });
    });
  });
});
