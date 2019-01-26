import React from 'react';
import { render } from 'react-testing-library';
import ItemsTable from './ItemsTable';

describe('components', function() {
  describe('ItemsTable', function() {
    it('should render with no items', function() {
      // render component to the page
      const { getByText } = render(<ItemsTable />);
      expect(getByText('Title')).toBeInTheDocument();
      expect(getByText('Type')).toBeInTheDocument();
      expect(getByText('Owner')).toBeInTheDocument();
    });
    it('should render a table row for each item', function() {
      const items = [
        { id: '3aef', title: 'Item 1', type: 'Web Map', owner: 'tomwayson' },
        {
          id: '4aef',
          title: 'Item 2',
          type: 'Web Mapping Application',
          owner: 'mjuniper'
        },
        {
          id: '5aef',
          title: 'Item 3',
          type: 'Feature Service',
          owner: 'dbouwman'
        }
      ];
      // render component to the page
      const { getByText } = render(<ItemsTable items={items} />);
      expect(getByText('Item 1')).toBeInTheDocument();
      expect(getByText('Item 2')).toBeInTheDocument();
      expect(getByText('Item 3')).toBeInTheDocument();
    });
  });
});
