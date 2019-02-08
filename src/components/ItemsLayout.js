import React from 'react';
import { ItemPager } from 'react-arcgis-hub';
import AgoSearch from './AgoSearch';
import ExtentsMap from './ExtentsMap';
import ItemsTable from './ItemsTable';

class ItemsLayout extends React.Component {
  onSearch = q => {
    const { onParamsChange } = this.props;
    if (onParamsChange) {
      onParamsChange(q);
    }
  };
  changePage = page => {
    const { num, onParamsChange, q } = this.props;
    // calculate next start record based on the number of records per page
    const start = (page - 1) * num + 1;
    if (onParamsChange) {
      onParamsChange(q, start);
    }
  };
  render() {
    const { results, total, num, q, start } = this.props;
    // compute current page number based on start record
    // and the number of records per page
    const pageNumber = (start - 1) / num + 1;
    return (
      <>
        <div className="row mb-2">
          <div className="col-9">
            <h2>
              Your search for &quot;{q}&quot; yielded {total} items
            </h2>
          </div>
          <div className="col-3">
            <AgoSearch
              q={q}
              onSearch={this.onSearch}
              className="search-form-inline"
              size="sm"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ExtentsMap items={results} />
            <ItemsTable items={results} />
            <ItemPager
              pageSize={num}
              totalCount={total}
              pageNumber={pageNumber}
              changePage={this.changePage}
            />
          </div>
        </div>
      </>
    );
  }
}

export default ItemsLayout;
