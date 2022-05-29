import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { MenuTopWrapper } from './styled/menuTop.js';

export default class MenuTop extends Component {
  render() {
    return (
      <MenuTopWrapper className="header-ol-menu">
          <ol className="header-ol">
            <li>
              <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
            </li>
            <li>
              <Link data-testid="link-to-favorites" to="/favorites">Favorito</Link>
            </li>
            <li>
              <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
            </li>
            <li>
              <Link
                to="/profile/edit"
                data-testid="link-to-profile-edit"
              >
                Perfil-Edit
              </Link>
            </li>
          </ol>
        </MenuTopWrapper>
    );
  }
}