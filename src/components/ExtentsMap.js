import React, { useRef, useEffect } from 'react';
import config from '../config/map';
import { newMap, coordsToExtent } from '../utils/map';

function ExtentsMap({ items }) {
  let refreshMap;
  // hooks
  // a ref to the DOM node where we want to create the map
  // see: https://reactjs.org/docs/hooks-reference.html#useref
  const mapNode = useRef();
  useEffect(() => {
    if (!refreshMap) {
      console.log('newMap');
      // map has not yet been loaded
      newMap(mapNode.current, config.options).then(refreshGraphics => {
        console.log('refreshGraphics', typeof refreshGraphics);
        refreshMap = refreshGraphics;
        // show the initial items on the map
        showItemsOnMap();
      });
    } else {
      // update the items on the map
      showItemsOnMap();
    }
    return () => {
      console.log('unmounting');
      // this may not be needed, but it should help
      // ensure the map and view are scheduled for garbage collection
      refreshMap = null;
    };
  }, [items]);
  function showItemsOnMap() {
    if (!refreshMap) {
      // map hasn't been loaded yet
      return;
    }
    // create an array of JSON graphics from the items
    const { symbol, popupTemplate } = config.itemExtents;
    const jsonGraphics =
      items &&
      items.map(item => {
        const geometry = coordsToExtent(item.extent);
        return { geometry, symbol, attributes: item, popupTemplate };
      });
    refreshMap(jsonGraphics);
  }
  return <div className="extents-map" data-testid="map" ref={mapNode} />;
}

export default ExtentsMap;
