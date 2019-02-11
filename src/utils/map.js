import { loadModules } from 'esri-loader';

// expect [[-53.2316, -79.8433], [180, 79.8433]] or []
export function coordsToExtent(coords) {
  if (coords && coords.length === 2) {
    return {
      type: 'extent',
      xmin: coords[0][0],
      ymin: coords[0][1],
      xmax: coords[1][0],
      ymax: coords[1][1],
      spatialReference: {
        wkid: 4326
      }
    };
  }
}

export function newMap(element, mapOptions) {
  // lazy-load the map modules and CSS
  return loadModules(['esri/Map', 'esri/views/MapView', 'esri/Graphic'], {
    css: 'https://js.arcgis.com/4.10/esri/css/main.css'
  }).then(([Map, MapView, Graphic]) => {
    // show the map at the element
    const map = new Map(mapOptions);
    const view = new MapView({
      map,
      container: element,
      zoom: 2
    });
    // wait for the view to load the map
    return view.when(() => {
      view.on('mouse-wheel', function(evt) {
        // prevents zooming with the mouse-wheel event
        evt.stopPropagation();
      });
      // let the caller know that the map is available and
      // return a function to refresh graphics that has access to
      // the esri/Graphic class and the view instance through closure scope
      return jsonGraphics => {
        if (!view || !view.ready) {
          return;
        }
        // clear any existing graphics
        view.graphics.removeAll();
        // convert json to graphics and add to map's graphic layer
        if (!jsonGraphics || jsonGraphics.length === 0) {
          return;
        }
        jsonGraphics.forEach(jsonGraphic => {
          view.graphics.add(new Graphic(jsonGraphic));
        });
      };
    });
  });
}
