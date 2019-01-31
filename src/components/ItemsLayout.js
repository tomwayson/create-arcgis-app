import React from 'react';
import { ItemPager } from 'react-arcgis-hub';
import AgoSearch from './AgoSearch';
import ExtentsMap from './ExtentsMap';
import ItemsTable from './ItemsTable';

function ItemsLayout({ results, total, num, q, start, onParamsChange }) {
  function onSearch(q) {
    if (onParamsChange) {
      onParamsChange(q);
    }
  }
  function changePage(page) {
    // calculate next start record based on the number of records per page
    const start = (page - 1) * num + 1;
    if (onParamsChange) {
      onParamsChange(q, start);
    }
  }
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
            onSearch={onSearch}
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
            changePage={changePage}
          />
        </div>
      </div>
    </>
  );
}

export default ItemsLayout;
