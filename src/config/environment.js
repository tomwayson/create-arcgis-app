// NOTE: this is a good place to store any variables
// that change depending on the application's environment
// see https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables

// defaults that all environments fall back to
const env = {
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
  // NOTE: currently the application assumes that it will be deployed to the server's root
  // if it needs to be deployed to a subfolder, we'd need to add a variable here for that
  // see: https://facebook.github.io/create-react-app/docs/deployment#building-for-relative-paths
};
// to change any of the above on a per environment basis, do something like
// use different cookies for different environments
const nodeEnv = process.env.NODE_ENV;
if (nodeEnv === 'development') {
  env.cookiePrefix = 'caa_dev';
}
if (nodeEnv === 'test') {
  env.cookiePrefix = 'caa_test';
}

export default env;
