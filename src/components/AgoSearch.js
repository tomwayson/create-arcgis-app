import React, { useState } from 'react';

function inputGroupClass(size) {
  const sizeClass = size ? `input-group-${size}` : '';
  return `input-group ${sizeClass}`.trim();
}

function AgoSearch({ q, size, onSearch, className }) {
  // use a copy of the search term so that we don't immediately update bound URL parameters
  const [searchCopy, setSearchCopy] = useState(q || '');
  function onChange(e) {
    // hold onto a copy of the search term
    setSearchCopy(e.target.value);
  }
  function onSubmit(e) {
    // don't actually submit the form
    e.preventDefault();
    if (onSearch) {
      // call search function that was passed in as a prop
      onSearch(searchCopy);
    }
  }
  const formClassName = `search-form${className ? ' ' + className : ''}`;
  return (
    <form className={formClassName} onSubmit={onSubmit}>
      <div className={inputGroupClass(size)}>
        <input
          className="form-control"
          placeholder="search for items"
          value={searchCopy}
          onChange={onChange}
        />
        <div className="input-group-append">
          <button className="btn btn-secondary" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

export default AgoSearch;
