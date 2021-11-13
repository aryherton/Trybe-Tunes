import React, { Component } from 'react';

import Header from '../components/Header';

export default class Search extends Component {
  render() {
    return (
      <div data-testid="page-search" id="pageSearch">
        {/* <form onSubmit={}> */}
        <Header />
        <form>
          <input
            type="text"
            // value={}
            // onChange={}
            placeholder="Search"
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}
