import React, { useRef, useState, useEffect } from 'react';
import config from '../config/map';
import { newMap, coordsToExtent } from '../utils/map';

function ExtentsMap({ items }) {
  // get a ref to the DOM node where we want to create the map
  // see: https://reactjs.org/docs/hooks-reference.html#useref
  const mapNode = useRef();
  // we will hold a proxy object in state for working with the map
  const [map, setMap] = useState(null);
  // initialize the map when the component is mounted
  // NOTE: passing [] as the 2nd arg tells react to run this effect
  // only on mount, and the clean up only on unmount; it won't run on updates
  useEffect(() => {
    // load the map once when the component mounts
    newMap(mapNode.current, config.options).then(refreshGraphics => {
      // this may seem a little strange, but
      // newMap() returns a function for refreshing the map's graphics
      // that we will make available to other hooks via state
      setMap({ refreshGraphics });
    });
    return () => {
      // this is run when the component unmounts and it should help
      // ensure that the map & view are scheduled for garbage collection
      setMap(null);
    };
  }, []);
  // every time the items are updated, refresh the graphic on the map
  useEffect(() => {
    if (!map) {
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
    map.refreshGraphics(jsonGraphics);
  }, [items, map]);
  // render a div to hold the map
  return <div className="extents-map" data-testid="map" ref={mapNode} />;
}

export default ExtentsMap;
