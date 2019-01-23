import { coordsToExtent } from './map';
describe ('utils', function () {
  describe ('map', function () {
    describe ('coordsToExtent', function () {
      it('it works', function() {
        const coords = [[-53.2316, -79.8433], [180, 79.8433]];
        let result = coordsToExtent(coords);
        expect(result).toEqual({
          type: 'extent',
          xmin: -53.2316,
          ymin: -79.8433,
          xmax: 180,
          ymax: 79.8433,
          spatialReference:{
            wkid:4326
          }
        });
      });
      it('it handles invalid coords', function() {
        let result = coordsToExtent([]);
        expect(result).toBeUndefined();
      });
    });
  });
});
