import React from 'react';
import './ExtentsMap.scss';
import config from '../config/map';
import { newMap, coordsToExtent } from '../utils/map';

class ExtentsMap extends React.Component {
  constructor(props) {
    super(props);
    // a ref to the DOM node where we want to create the map
    // see: https://reactjs.org/docs/refs-and-the-dom.html
    this.mapNode = React.createRef();
  }
  showItemsOnMap () {
    if (!this.refreshGraphics) {
      // map hasn't been loaded yet
      return;
    }
    // create an array of JSON graphics from the items
    const { items } = this.props;
    const { symbol, popupTemplate } = config.itemExtents;
    const jsonGraphics = items && items.map(item => {
      const geometry = coordsToExtent(item.extent);
      return { geometry, symbol, attributes: item, popupTemplate };
    });
    this.refreshGraphics(jsonGraphics);
  }
  // react lifecycle methods
  componentDidMount () {
    // load and render the map
    newMap(this.mapNode.current, config.options)
    .then(refreshGraphics => {
      // hold onto function to refresh graphics
      // NOTE: we don't use props/state for this b/c we don't want to trigger a re-render
      // see https://medium.freecodecamp.org/where-do-i-belong-a-guide-to-saving-react-component-data-in-state-store-static-and-this-c49b335e2a00#978c
      this.refreshGraphics = refreshGraphics;
      // show the initial items on the map
      this.showItemsOnMap();
    });
  }
  componentDidUpdate (prevProps) {
    if (prevProps.items !== this.props.items) {
      this.showItemsOnMap();
    }
  }
  componentWillUnmount () {
    // this may not be needed, but it should help
    // ensure the map and view are scheduled for garbage collection
    delete this.refreshGraphics;
  }
  render () {
    return (
      <div className="extents-map" data-testid="map" ref={this.mapNode}></div>
    );
  }
}

export default ExtentsMap;
