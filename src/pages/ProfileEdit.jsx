import React, { Component } from 'react';

import Header from '../components/header/Header';

export default class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit" id="page-profile-edit">
        <Header />
        <h1>ProfileEdit</h1>
      </div>
    );
  }
}
