import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AgoSearch from '../components/AgoSearch';

function Home({ title }) {
  const [searchTerm, setSearchTerm] = useState();
  if (searchTerm) {
    // pass the search term to the items page
    return (
      <Redirect
        to={{
          pathname: '/items',
          search: `?q=${searchTerm}`,
          push: true
        }}
      />
    );
  }
  // otherwise render the search form
  return (
    <div className="jumbotron">
      <h1 className="display-3 text-light text-center mb-5">{title}</h1>
      {/* update the state, which triggers a re-render & redirect */}
      <AgoSearch q="" onSearch={setSearchTerm} size="lg" />
    </div>
  );
}

export default Home;
