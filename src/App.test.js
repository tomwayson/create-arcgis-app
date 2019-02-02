import React from 'react';
import { render, wait } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

describe('smoke tests', function() {
  describe('w/o a previous session', function() {
    it('renders app title and sign in button', () => {
      const { getByText } = render(
        <Router>
          <App />
        </Router>
      );
      expect(getByText('Ambitious ArcGIS App')).toBeInTheDocument();
      expect(getByText('Sign In')).toBeInTheDocument();
    });
  });
});
