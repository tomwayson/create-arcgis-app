import React from 'react';

/*
  Pagination controls that work with the ArcGIS Online style of pagination
  Takes:
    - pageSize
    - totalCount
    - pageNumber not an index, a page number (ie, 1 based, not 0 based)
    - changePage: a function that will get called with the page number to change to
*/
function ItemPager ({ pageSize, totalCount, pageNumber, changePage }) {
  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages < 2) {
    // don't show pagination if only one page
    return null;
  }
  const currentPage = pageNumber;

  const start = (totalPages > 10 && currentPage > 6) ? currentPage - 5 : 1;
  const end = (totalPages > start + 9) ? start + 9 : totalPages;

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push({ number: i, isActive: i === currentPage });
  }
  return (
    <ul className="pagination">
      {/* TODO: first and previous links */}
      {
        pages.map(page => {
          return <PageItem pageNumber={page.number} isActive={page.isActive} changePage={changePage} key={page.number} />
        })
      }
      {/* TODO: next and last links */}
    </ul>
  )
}

class PageItem extends React.Component {
  constructor (props) {
    super(props);
  }
  onClick = (e) => {
    e.preventDefault();
    const {
      changePage,
      pageNumber
    } = this.props;
    if (changePage) {
      changePage(pageNumber);
    }
  }
  render () {
    const {
      isActive,
      pageNumber
    } = this.props;
    const className = `page-item${ isActive && ' active'}`;
    return (
      <li className={className}>
        <a className="page-link" href="" onClick={this.onClick}>{pageNumber}</a>
      </li>
    );
  }
}

export default ItemPager;
