export default {
  // OAuth settings
  // see: https://esri.github.io/arcgis-rest-js/guides/browser-authentication/
  // NOTE: the item for this application can be seen here:
  // http://www.arcgis.com/home/item.html?id=30d50f3d1d864ddc8b71ee06cfed242d
  // when deploying to your own domain, you should first
  // create your own item and register the URL where it will be deployed
  // and then use that application's App ID as the clientId below
  clientId: 'wy6Km7vd1dv6c4EG',
  portal: 'https://www.arcgis.com/sharing/rest',
  // app cookies will be prefixed with this, ex: caa_session
  cookiePrefix: 'caa'
};
