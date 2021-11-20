import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorite: [],
      checkFavorite: false,
    };

    this.selectRender = this.selectRender.bind(this);
    this.addFavotite = this.addFavotite.bind(this);
    this.controlFavorite = this.controlFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  deleteFavorite(event) {
    console.log('deletar '+event.target.value);
  }

  // Parei aqui os dados que a functino quer receber está na minha conversa com o tonis
  async addFavotite(event) {
    this.setState({ loading: true });
    console.log(event.target.value);
    // const { idSearch } = this.props;
    // await addSong(getMusics(idSearch));
  }

  async controlFavorite(event) {
    const { checkFavorite } = this.state;
    await this.setState({ checkFavorite: !checkFavorite });
    if (!checkFavorite) {
      this.addFavotite(event);
    } else {
      this.deleteFavorite(event);
    }
  }

  selectRender() {
    const { albuns, checkFavorite } = this.props;
    if (albuns.length > 0) {
      return (
        <div>
          <div>
            <ul>
              { albuns.map((album, keyMap) => (
                <li key={ keyMap }>
                  <div>
                    <p data-testid="album-price">{ album.trackName }</p>
                    <label
                      htmlFor="input-favorite"
                    >
                      Favorita
                      <input
                        type="checkbox"
                        id="input-favorite"
                        value={ album.trackId }
                        data-testid={ `checkbox-music-${album.trackId}` }
                        onClick={ this.controlFavorite }
                        checked={ checkFavorite }
                      />
                    </label>
                    <audio
                      data-testid="audio-component"
                      src={ album.previewUrl }
                      controls
                    >
                      <track kind="captions" />
                      { 'O seu navegador não suporta o elemento' }
                      {' '}
                      <code>audio</code>
                      .
                    </audio>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } if (albuns.length === 0) {
      return <Loading />;
    }
    return <p>Nenhuma música a listar</p>;
  }

  render() {
    return this.selectRender();
  }
}

MusicCard.propTypes = {
  albuns: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;
