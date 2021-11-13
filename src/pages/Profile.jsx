import React, { Component } from 'react';

import Header from '../components/Header';

export default class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile" id="pageProfile">
        <Header />
        <h1>Profile</h1>
      </div>
    );
  }
}
