import React, { useCallback } from 'react';
import { ItemPager } from 'react-arcgis-hub';
import AgoSearch from './AgoSearch';
import ExtentsMap from './ExtentsMap';
import ItemsTable from './ItemsTable';

function ItemsLayout({ results, total, num, q, start, onParamsChange }) {
  // memoized callbacks for action handlers
  // NOTE: it's probably fine to just use inline fns in the JSX below instead
  // see: https://reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render
  const onSearch = useCallback(
    newQ => {
      if (onParamsChange) {
        onParamsChange(newQ);
      }
    },
    [onParamsChange]
  );
  const changePage = useCallback(
    page => {
      if (onParamsChange) {
        // calculate next start record based on the number of records per page
        const start = (page - 1) * num + 1;
        onParamsChange(q, start);
      }
    },
    [q, num]
  );
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
