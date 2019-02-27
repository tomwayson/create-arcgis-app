import { loadMap, itemToGraphicJson } from './map';

describe('utils', function() {
  describe('map', function() {
    describe('loadMap', function() {
      // TODO: write a meaningful test of loadMap()
      let result = typeof loadMap === 'function';
      expect(result).toBeTruthy();
    });
    describe('itemToGraphicJson', function() {
      it('it works', function() {
        const item = {
          extent: [[-53.2316, -79.8433], [180, 79.8433]],
          title: 'Test Item',
          snippet: 'this is a test item'
        };
        let result = itemToGraphicJson(item);
        expect(result.geometry).toEqual({
          type: 'extent',
          xmin: -53.2316,
          ymin: -79.8433,
          xmax: 180,
          ymax: 79.8433,
          spatialReference: {
            wkid: 4326
          }
        });
        expect(result.attributes).toEqual(item);
      });
      it('it handles invalid coords', function() {
        const item = {
          title: 'Item with no extent',
          snippet: 'sometimes items do not have extents'
        };
        let result = itemToGraphicJson(item);
        expect(result.attributes).toEqual(item);
      });
    });
  });
});
