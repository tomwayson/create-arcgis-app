import React from 'react';
import { Redirect } from 'react-router-dom';
import AgoSearch from '../components/AgoSearch';

class Home extends React.Component {
  state = {
    searchTerm: undefined
  };
  onSearch = searchTerm => {
    // set the search term in state, which triggers a re-render
    this.setState({ searchTerm });
  };
  render() {
    const { searchTerm } = this.state;
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
        <h1 className="display-3 text-light text-center mb-5">
          Ambitious ArcGIS App
        </h1>
        <AgoSearch q="" onSearch={this.onSearch} size="lg" />
      </div>
    );
  }
}

export default Home;
