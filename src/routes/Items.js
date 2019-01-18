import React from 'react';
import { Alert } from 'reactstrap';
import { searchItems } from '@esri/arcgis-rest-items';
import './Items.scss';
import AgoSearch from '../components/AgoSearch';
import ItemsTable from '../components/ItemsTable';
import ItemPager from '../components/ItemPager';

// parse search term from query string
function parseSearch(search) {
  // NOTE: URLSearchParams() only works in real browsers,
  // for IE support use https://www.npmjs.com/package/query-string 
  const params = search && new URLSearchParams(search);
  return params 
  ? {
      num: params.get('num') || 10,
      // NOTE: default q is set right before executing query,
      // if set here, an empty search box appears to be out of sync
      q: params.get('q'),
      start: params.get('start') || 1
    }
  : {};
}

function didSearchParamsChange(prevLocation, location) {
  const prevSearch = prevLocation && prevLocation.search;
  const search = location && location.search;
  return search !== prevSearch;
}

// NOTE: location is passed in by react router
class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      results: undefined,
      total: 0
    };
  }
  onSearch = (q) => {
    // update the route query params after the user submits the inline search form
    // NOTE: `location` and `history` are passed in by react-router
    // see: https://tylermcginnis.com/react-router-programmatically-navigate/
    const {
      history,
      location 
    } = this.props;
    const path = `${location.pathname}/items?q=${q}`;
    history.push(path)
  }
  changePage = (page) => {
    // calculate next start record based on the number of records per page
    const {
      history,
      location 
    } = this.props;
    const { num, q } = parseSearch(location.search);
    const nextStart = ((page - 1) * num) + 1;
    // change the page by updating the start query param
    const path = `${location.pathname}?q=${q}&start=${nextStart}`;
    history.push(path);
  }
  doSearch() {
    const { location } = this.props;
    // parse search params out of query string w/ defaults
    const searchForm = parseSearch(location.search);
    if (!searchForm.q) {
      searchForm.q = '*';
    }
    // execute search and update state
    return searchItems({
      searchForm
    })
    .then(({ results, total }) => {
      this.setState({ results, total });
    }).catch(e => {
      this.setState({ error: e.message || e })
    });
  }
  componentDidMount () {
    // execute the search when this route first loads
    this.doSearch();
  }
  componentDidUpdate (prevProps) {
    if (didSearchParamsChange(prevProps.location, this.props.location)) {
      // re-exectute the search based on the new query params
      this.doSearch();
    }
  }
  render () {
    const {
      error,
      results,
      total
    } = this.state;
    if (error) {
      return <Alert color="danger">{error}</Alert>;
    }
    if (!results) {
      // TODO: better loading state
      return 'loading...';
    }
    // parse search params out of the query string
    const { location } = this.props;
    const { num, q, start } = parseSearch(location.search);
    // compute current page number based on start record
    // and the number of records per page
    const pageNumber = ((start - 1) / num) + 1;
    return (
      <>
        <div className="row mb-2">
          <div className="col-9">
            <h2>Your search for "{q}" yielded {total} items</h2>
          </div>
          <div className="col-3">
            <AgoSearch q={q} onSearch={this.onSearch} className="search-form-inline" size="sm" />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {/* TODO: extents map component */}
            <ItemsTable items={results} />
            <ItemPager pageSize={num} totalCount={total} pageNumber={pageNumber} changePage={this.changePage} />
          </div>
        </div>
      </>
    );  
  }
}

export default Items;
