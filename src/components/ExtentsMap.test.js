import { loadMap, showItemsOnMap } from '../utils/map';
import React from 'react';
import { render, wait } from 'react-testing-library';
import ExtentsMap from './ExtentsMap';
import config from '../config/map';

jest.mock('../utils/map');

// mock item search response
function mockItems() {
  return [
    {
      title: 'Item 1',
      snippet: 'Item 1 snippet',
      extent: [[-75.5596, 38.9285], [-73.9024, 41.3576]]
    },
    {
      title: 'Item 2',
      snippet: 'Item 2 snippet',
      extent: [[-74, 39], [-73, 40]]
    },
    {
      title: 'Item 3',
      snippet: 'Item 3 snippet',
      extent: [[-53.2316, -79.8433], [180, 79.8433]]
    }
  ];
}

describe('components', function() {
  describe('ExtentsMap', function() {
    it('should render', function() {
      // stub the loadMap() function and have it return a mock view
      // to ensure the ArcGIS API is not loaded and a map is not rendered
      const mockView = {};
      loadMap.mockResolvedValue(mockView);
      // mock showItemsOnMap()
      showItemsOnMap.mockReturnValue(undefined);
      // first render component to the page w/o items
      const { getByTestId, rerender } = render(<ExtentsMap />);
      // validate that the the DOM node was rendered
      expect(getByTestId('map')).toBeInTheDocument();
      // validate that loadMap() was called w/ a DOM node and map options
      expect(loadMap.mock.calls.length).toBe(1);
      const loadMapArgs = loadMap.mock.calls[0];
      expect(loadMapArgs[0]).toBeInstanceOf(HTMLDivElement);
      expect(loadMapArgs[1]).toEqual(config.options);
      // wait (one tick) for mocked loadMap() to resolve
      return wait().then(() => {
        // then update the items
        const items = mockItems();
        rerender(<ExtentsMap items={items} />);
        // validate that showItemsOnMap() was called exactly twice
        expect(showItemsOnMap.mock.calls.length).toBe(2);
        // w/ the correct arguments
        const { symbol, popupTemplate } = config.itemExtents;
        expect(showItemsOnMap.mock.calls[0]).toEqual([
          mockView,
          undefined,
          symbol,
          popupTemplate
        ]);
        expect(showItemsOnMap.mock.calls[1]).toEqual([
          mockView,
          items,
          symbol,
          popupTemplate
        ]);
      });
    });
  });
});
