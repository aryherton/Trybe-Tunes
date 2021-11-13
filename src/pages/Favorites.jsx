import React, { Component } from 'react';

import Header from '../components/Header';

export default class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites" id="pageFavorites">
        <Header />
        <h1>Favorites</h1>
      </div>
    );
  }
}
