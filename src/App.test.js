import React from 'react';
import { render, wait } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

describe('smoke tests', function() {
  describe('w/o a previous session', function() {
    const title = 'Test Title';
    it('renders app title and sign in button', () => {
      const { getAllByText } = render(
        <Router>
          <App title={title} />
        </Router>
      );
      expect(getAllByText(title)[0]).toBeInTheDocument();
      expect(getAllByText('Sign In')[0]).toBeInTheDocument();
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
