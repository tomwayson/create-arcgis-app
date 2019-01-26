import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import AgoSearch from './AgoSearch';

describe('components', function() {
  describe('AgoSearch', function() {
    it('should pass q to input and call onSearch when button is clicked', function() {
      const q = 'initial q';
      // test double for the search handler
      const onSearch = jest.fn();
      // render component to the page
      const { getByPlaceholderText, getByText } = render(
        <AgoSearch q={q} onSearch={onSearch} size="sm" />
      );
      // inital dom state
      const input = getByPlaceholderText('search for items');
      expect(input.value).toBe(q);
      let newQ = 'new q';
      // change the value and click the search button
      fireEvent.change(input, { target: { value: newQ } });
      getByText('Search').click();
      expect(onSearch).toBeCalledWith(newQ);
      expect(onSearch).toHaveBeenCalledTimes(1);
    });
  });
});
