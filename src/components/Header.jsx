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
        <div className="name-user">
          <span data-testid="header-user-name">{ nome }</span>
          <nav>
            <ol>
              <li>
                <Link data-testid="link-to-search" to="/Search">Pesquisar</Link>
              </li>
              |
              <li>
                <Link data-testid="link-to-favorites" to="/Favorites">Favorito</Link>
              </li>
              |
              <li>
                <Link data-testid="link-to-profile" to="/Profile">Perfil</Link>
              </li>
              |
              <li>
                <Link to="/ProfileEdit">Perfil-Edit</Link>
              </li>
            </ol>
          </nav>
        </div>
      </header>
    );
  }

  render() {
    return this.selectRender();
  }
}
