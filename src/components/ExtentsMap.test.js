import { newMap, coordsToExtent } from '../utils/map';
import React from 'react';
import { render, wait } from 'react-testing-library';
import ExtentsMap from './ExtentsMap';

jest.mock('../utils/map');

describe('components', function () {
  describe('ExtentsMap', function () {
    it('should render with no items', function () {
      // mock newMap() and the function to refresh graphics that it returns
      const refreshGraphics = jest.fn();
      newMap.mockResolvedValue(refreshGraphics);
      // render component to the page
      const { getByTestId } = render(<ExtentsMap />);
      // validate that the the DOM node was rendered
      expect(getByTestId('map')).toBeInTheDocument();
      // validate that newMap() was called w/ a DOM node and map options
      expect(newMap.mock.calls.length).toBe(1);
      const newMapArgs = newMap.mock.calls[0];
      expect(newMapArgs[0]).toBeInstanceOf(HTMLDivElement);
      expect(newMapArgs[1]).toEqual({
        basemap: 'gray'
      });
      // wait (one tick) for mocked newMap() to resolve
      return wait()
      .then(() => {
        // validate that refreshGraphics() was called w/ the correct arguments
        expect(refreshGraphics.mock.calls.length).toBe(1);
        expect(refreshGraphics.mock.calls[0][0]).toBeUndefined();
      });
    });
    it('should call refreshGraphics with an array of graphics for each item', function () {
      // mock newMap() and the function to refresh graphics that it returns
      const refreshGraphics = jest.fn();
      newMap.mockResolvedValue(refreshGraphics);
      // mock item search response w/ extents
      const items = [
        { id: '3aef', title: 'Item 1', type: 'Web Map', owner: 'tomwayson', extent: [[-75.5596, 38.9285], [-73.9024, 41.3576]] },
        { id: '4aef', title: 'Item 2', type: 'Web Mapping Application', owner: 'mjuniper', extent: [[-74, 39], [-73, 40]] },
        { id: '5aef', title: 'Item 3', type: 'Feature Service', owner: 'dbouwman', extent: [[-53.2316, -79.8433], [180, 79.8433]] }
      ];
      // render component to the page
      const { getByText } = render(<ExtentsMap items={items} />);
      // wait (one tick) for mocked newMap() to resolve
      return wait()
      .then(() => {
        // validate that refreshGraphics() was called w/ the correct arguments
        expect(refreshGraphics.mock.calls.length).toBe(1);
        const graphicsJson = refreshGraphics.mock.calls[0][0];
        // items should be assigned to graphic attributes
        expect(graphicsJson.map(graphicJson => graphicJson.attributes)).toEqual(items);
        // coordsToExtent should have been called w/ each extent
        const extents = items.map(item => item.extent);
        expect(coordsToExtent.mock.calls.map(args => args[0])).toEqual(extents);
      });
    });
  });
});
