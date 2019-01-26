export default {
  // map initialization options
  options: {
    basemap: 'gray'
  },
  // item extents graphics on map
  itemExtents: {
    symbol: {
      color: [51, 122, 183, 0.125],
      outline: {
        color: [51, 122, 183, 1],
        width: 1,
        type: 'simple-line',
        style: 'solid'
      },
      type: 'simple-fill',
      style: 'solid'
    },
    popupTemplate: {
      title: '{title}',
      content: '{snippet}'
    }
  }
};
