import React, { useState, useEffect } from 'react';
import { Alert } from 'reactstrap';
import { searchItems } from '@esri/arcgis-rest-portal';
import { parseSearch } from '../utils/search';
import ItemsLayout from '../components/ItemsLayout';

// NOTE: `location` and `history` are passed in by react-router
// see: https://tylermcginnis.com/react-router-programmatically-navigate/
function Items({ history, location, session }) {
  // initialize state
  // NOTE: we're using a single state variable b/c all pieces of state change together
  // this is *not* the same as the legacy setState() API
  // see: https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables
  const initialState = { error: undefined, results: [], total: 0 };
  const [state, setState] = useState(initialState);
  // parse search params out of query string w/ defaults
  const search = location && location.search;
  const { num, q, start } = parseSearch(search);
  // (re)execute search whenever the query params or session changes
  useEffect(() => {
    console.log('in: ' + q);
    if (!q) {
      // invalid search term, emulate an empty response rather than sending a request
      setState({ ...initialState });
    } else {
      // execute search and update state
      searchItems({ num: num, q: q, start: start, authentication: session })
        .then(({ results, total }) => {
          setState({ error: null, results, total });
        })
        .catch(e => {
          setState({ error: e.message || e, results: [], total: 0 });
        });
    }
  }, [search, session]);
  // an inline function for action handler, and yes, thats OK
  // see: https://reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render
  // and: https://cdb.reacttraining.com/react-inline-functions-and-performance-bdff784f5578
  function onParamsChange(newQ, newStart) {
    // update the route query params after the user either
    // submits the inline search form or links to a new page
    let path = `${location.pathname}?q=${newQ}`;
    if (newStart) {
      path = `${path}&start=${newStart}`;
    }
    history.push(path);
  }
  // render
  const { error, results, total } = state;
  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }
  if (!results) {
    // TODO: better loading state
    return 'loading...';
  }
  // render the items page
  return (
    <ItemsLayout
      results={results}
      total={total}
      num={num}
      q={q}
      start={start}
      onParamsChange={onParamsChange}
    />
  );
}

export default Items;
