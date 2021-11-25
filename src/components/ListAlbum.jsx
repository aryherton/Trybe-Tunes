import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ListAlbum extends Component {
  creatLiAlbuns = () => {
    const { listAlbum } = this.props;
    const liAlbuns = listAlbum.map((item, keyId) => (
      <li key={ keyId }>
        <Link
          data-testid={ `link-to-album-${item.collectionId}` }
          to={ `/album/${item.collectionId}` }
        >
          <img src={ item.artworkUrl100 } alt={ item.collectionName } />
          <span>
            <h1>{ item.collectionName }</h1>
            <h2>{ item.artistName }</h2>
          </span>
        </Link>
      </li>
    ));
    return liAlbuns;
  }

  render() {
    return (
      <section id="section-ListAlbum">
        <h1>Álbuns</h1>
        <ol>
          { this.creatLiAlbuns() }
        </ol>
      </section>
    );
  }
}

ListAlbum.propTypes = {
  listAlbum: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
