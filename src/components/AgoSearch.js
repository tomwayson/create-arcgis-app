import React from 'react';

class AgoSearch extends React.Component {
  constructor(props) {
    super(props);
    // use a copy so that we don't immediately update bound URL parameters
    this.state = { searchCopy: props.q || '' };
  }
  onChange = e => {
    // hold onto a copy of the search term
    this.setState({ searchCopy: e.target.value });
  };
  onSearch = e => {
    // don't actually submit the form
    e.preventDefault();
    const { onSearch } = this.props;
    if (onSearch) {
      // call search function that was passed in as a prop
      onSearch(this.state.searchCopy);
    }
  };
  render() {
    const { size, className } = this.props;
    const formClassName = `search-form ${className}`;
    const inputGroupClass = `input-group ${size && `input-group-${size}`}`;
    return (
      <form className={formClassName} onSubmit={this.onSearch}>
        <div className={inputGroupClass}>
          <input
            className="form-control"
            placeholder="search for items"
            value={this.state.searchCopy}
            onChange={this.onChange}
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
}

export default AgoSearch;
