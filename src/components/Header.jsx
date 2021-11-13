import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="name-user">
          <nav>
            <Link to="/Search">Pesquisar</Link>
            <Link to="/Profile">Perfil</Link>
            <Link to="/Favorites">Favorito</Link>
          </nav>
        </div>
      </header>
    );
  }
}
