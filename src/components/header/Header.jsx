import React, { Component } from 'react';

import { getUser } from '../../services/userAPI';
import Loading from '../Loading';

import { HeaderWrapper } from './styled/headerStyled.js';
import { logo02, userPng } from '../../image';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      renderLoading: false,
    };
    this.userName = this.userName.bind(this);
    this.selectRender = this.selectRender.bind(this);
  }

  componentDidMount() {
    this.userName();
  }

  async userName() {
    this.setState({ renderLoading: true });
    const user = await getUser();
    this.setState({ nome: user.name, renderLoading: false });
  }

  selectRender() {
    const { renderLoading, nome } = this.state;

    if (renderLoading) {
      return <Loading />;
    }
    return (
      <HeaderWrapper className="header" data-testid="header-component">
        <div className="logoTop">
          <img src={ logo02 } alt="logo-Trybe-Tunes" />
        </div>
        <div className="div-user">
          <span
            data-testid="header-user-name"
            className="header-user-span"
          >
            { nome }
          </span>
          <img src={ userPng } alt="icon-user" />
        </div>
      </HeaderWrapper>
    );
  }

  render() {
    return this.selectRender();
  }
}
