import React from 'react';
import { Alert } from 'reactstrap';
import { searchItems } from '@esri/arcgis-rest-items';
import { parseSearch, didSearchParamsChange } from '../utils/search';
import ItemsLayout from '../components/ItemsLayout';

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      results: undefined,
      total: 0
    };
  }
  onParamsChange = (q, start) => {
    // update the route query params after the user either
    // submits the inline search form or links to a new page
    // NOTE: `location` and `history` are passed in by react-router
    // see: https://tylermcginnis.com/react-router-programmatically-navigate/
    const { history, location } = this.props;
    let path = `${location.pathname}?q=${q}`;
    if (start) {
      path = `${path}&start=${start}`;
    }
    history.push(path);
  };
  doSearch() {
    // get the query string and session from props
    const { location, session: authentication } = this.props;
    // parse search params out of query string w/ defaults
    const searchForm = parseSearch(location.search);
    if (!searchForm.q) {
      // invalid search term, emulate an empty response rather than sending a request
      this.setState({ results: [], total: 0 });
      return Promise.resolve();
    }
    // execute search and update state
    return searchItems({
      searchForm,
      authentication
    })
      .then(({ results, total }) => {
        this.setState({
          error: null,
          results,
          total
        });
      })
      .catch(e => {
        this.setState({
          error: e.message || e,
          results: null,
          total: 0
        });
      });
  }
  // react lifecyle methods
  componentDidMount() {
    // execute the search when this route first loads
    this.doSearch();
  }
  componentDidUpdate(prevProps) {
    const { location, session } = this.props;
    const paramsUpdated = didSearchParamsChange(prevProps.location, location);
    const sessionUpdated = prevProps.session !== session;
    if (paramsUpdated || sessionUpdated) {
      // re-exectute the search based on the new query params or log in status
      this.doSearch();
    }
  }
  render() {
    const { error, results, total } = this.state;
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
    // render the items page
    return (
      <ItemsLayout
        results={results}
        total={total}
        num={num}
        q={q}
        start={start}
        onParamsChange={this.onParamsChange}
      />
    );
  }
}

export default Items;
