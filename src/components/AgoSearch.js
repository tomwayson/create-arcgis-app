import React from "react";

function inputGroupClass(size) {
  const sizeClass = size ? `input-group-${size}` : '';
  return `input-group ${sizeClass}`.trim();
}

class AgoSearch extends React.Component {
  constructor(props) {
    super(props);
    // use a copy so that we don't immediately update bound URL parameters
    this.state = { searchCopy: props.q || '' };
  }
  onChange = (e) => {
    // hold onto a copy of the search term
    this.setState({ searchCopy: e.target.value });
  }
  onSearch = (e) => {
    // don't actually submit the form
    e.preventDefault();
    if (this.props.onSearch) {
      // call search function that was passed in as a prop
      this.props.onSearch(this.state.searchCopy);
    }
  }
  render() {
    return (
      <form className="search-form" onSubmit={this.onSearch}>
        <div className={inputGroupClass(this.props.size)}>
          <input className='form-control' placeholder="search for items" value={this.state.searchCopy} onChange={this.onChange} />
          <div className="input-group-append">
            <button className="btn btn-secondary" type="submit">Search</button>
          </div>
        </div>
      </form>
    );
  }
}

export default AgoSearch;
