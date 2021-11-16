import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../services/userAPI';
import '../css/header.css';
import Loading from './Loading';

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
      <header className="header" data-testid="header-component">
        <div className="div-user">
          <span
            data-testid="header-user-name"
            className="header-user-span"
          >
            { nome }
          </span>
        </div>
        <nav className="header-ol-menu">
          <ol className="header-ol">
            <li>
              <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
            </li>
            |
            <li>
              <Link data-testid="link-to-favorites" to="/favorites">Favorito</Link>
            </li>
            |
            <li>
              <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
            </li>
            |
            <li>
              <Link
                to="/profile/edit"
                data-testid="link-to-profile-edit"
              >
                Perfil-Edit
              </Link>
            </li>
          </ol>
        </nav>
      </header>
    );
  }

  render() {
    return this.selectRender();
  }
}
