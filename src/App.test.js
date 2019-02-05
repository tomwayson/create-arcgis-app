import React from 'react';
import { render, wait } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

describe('smoke tests', function() {
  describe('w/o a previous session', function() {
    const title = 'Test Title';
    it('renders app title and sign in button', () => {
      const { getByText } = render(
        <Router>
          <App title={title} />
        </Router>
      );
      expect(getByText(title)).toBeInTheDocument();
      expect(getByText('Sign In')).toBeInTheDocument();
    });
    it('matches snapshot', () => {
      const { asFragment } = render(
        <Router>
          <App title={title} />
        </Router>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
