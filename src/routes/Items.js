import React from 'react';
import { Alert } from 'reactstrap';
import { searchItems } from '@esri/arcgis-rest-items';

// parse search term from query string
function parseSearch(search) {
  // NOTE: URLSearchParams() only works in real browsers,
  // for IE support use https://www.npmjs.com/package/query-string 
  const params = search && new URLSearchParams(search);
  // TODO: don't default to '*'?
  return params ? params.get('q') : '*';
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
  doSearch() {
    const { location } = this.props;
    const q = parseSearch(location.search);
    // execute search and update state
    return searchItems({
      // TODO: get start and num out of query string too
      searchForm: { q, start: 1, num: 10 }
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
    const { location } = this.props;
    const q = parseSearch(location.search);
    return (
      <>
        <div className="row mb-2">
          <div className="col-9">
            <h2>Your search for {q} yielded {total} items</h2>
          </div>
          <div className="col-3">
            {/* TODO: search component */}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {/* TODO: extents map component */}
            <ItemsTable items={results} />
            {/* TODO: item pager component */}
          </div>
        </div>
      </>
    );  
  }
}

function ItemsTable ({ items }) {
  return (
    <table className="table table-striped table-bordered table-hover">
      <thead className="thead-dark">
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Owner</th>
        </tr>
      </thead>
      <tbody>
        {
          items.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.type}</td>
                <td>{item.owner}</td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  ); 
}

export default Items;
