import React from 'react';
import { render } from 'react-testing-library';
import UserMenu from './UserMenu';

describe('components', function() {
  describe('UserMenu', function() {
    it('should render sign in link w/ no user', function() {
      // render component to the page
      const { getByText, queryByText } = render(<UserMenu />);
      expect(getByText('Sign In')).toBeInTheDocument();
      expect(queryByText('Tom Wayson')).toBeNull();
    });
    it('should render full name w/ a user', function() {
      const mockUser = {
        fullName: 'Tom Wayson'
      };
      // render component to the page
      const { getByText, queryByText } = render(
        <UserMenu currentUser={mockUser} />
      );
      expect(queryByText('Sign In')).toBeNull();
      expect(getByText('Tom Wayson')).toBeInTheDocument();
    });
  });
});
