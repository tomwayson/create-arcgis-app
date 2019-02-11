/**
 * parse search params out of query string w/ defaults
 * @param {string} search
 */
export function parseSearch(search) {
  const defaults = {
    num: 10,
    start: 1
  };
  // NOTE: URLSearchParams() only works in real browsers,
  // for IE support use https://www.npmjs.com/package/query-string
  const params = search && new URLSearchParams(search);
  if (!params) {
    return defaults;
  }
  const num = params.get('num');
  const start = params.get('start');
  return {
    num: num ? parseInt(num) : defaults.num,
    q: params.get('q'),
    start: start ? parseInt(start) : defaults.start
  };
}
