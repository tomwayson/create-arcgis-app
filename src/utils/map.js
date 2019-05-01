import { loadModules } from 'esri-loader';

// NOTE: module, not global scope
let _Graphic;

// lazy load the ArcGIS API modules and CSS
// then create a new map view at an element
export function loadMap(element, mapOptions) {
  return loadModules(
    ['esri/Map', 'esri/views/MapView', 'esri/Graphic'],
    // NOTE: keep this current w/ the latest version of the JSAPI
    { css: 'https://js.arcgis.com/4.11/esri/css/main.css' }
  ).then(([Map, MapView, Graphic]) => {
    if (!element) {
      // component or app was likely destroyed
      return;
    }
    // hold onto the graphic class for later use
    _Graphic = Graphic;
    // create the Map
    const map = new Map(mapOptions);
    // show the map at the element
    let view = new MapView({
      map,
      container: element,
      zoom: 2
    });
    // wait for the view to load
    return view.when(() => {
      // prevent zooming with the mouse-wheel
      view.on('mouse-wheel', function(evt) {
        evt.stopPropagation();
      });
      // return a reference to the view
      return view;
    });
  });
}

export function showItemsOnMap(view, items, symbol, popupTemplate) {
  if (!_Graphic) {
    throw new Error('You must load a map before creating new graphics');
  }
  if (!view || !view.ready) {
    return;
  }
  // clear any existing graphics (if any)
  view.graphics.removeAll();
  if (!items) {
    return;
  }
  // convert items to graphics and add to the view
  items.forEach(item => {
    const graphicJson = itemToGraphicJson(item, symbol, popupTemplate);
    view.graphics.add(new _Graphic(graphicJson));
  });
}

export function itemToGraphicJson(item, symbol, popupTemplate) {
  const geometry = coordsToExtent(item.extent);
  return { geometry, symbol, attributes: item, popupTemplate };
}

// expect [[-53.2316, -79.8433], [180, 79.8433]] or []
function coordsToExtent(coords) {
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
