import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      arrFavorite: [],
    };
  }

  componentDidMount() {
    const ms = 10;
    this.timerID = setInterval(
      () => this.checkFavorite(),
      ms,
    );
  }

  checkFavorite = async () => {
    let { arrFavorite } = this.state;
    arrFavorite = await getFavoriteSongs();
    if (arrFavorite) {
      arrFavorite = arrFavorite.map((item) => item.trackId);
      this.setState({ arrFavorite });
    }
  }

  selectRender() {
    const { arrFavorite } = this.state;
    const {
      albuns,
      loading,
      controlFavorite } = this.props;
    const [, ...arrNew] = albuns;
    if (albuns.length > 0 && !loading) {
      return (
        <div>
          <div>
            <ul>
              { arrNew.map((album, keyMap) => (
                <li key={ keyMap }>
                  <div>
                    <p data-testid="album-price">{ album.trackName }</p>
                    <label
                      htmlFor="input-favorite"
                      value="Favorita"
                    >
                      <input
                        type="checkbox"
                        id="input-favorite"
                        value={ album.trackId }
                        data-testid={ `checkbox-music-${album.trackId}` }
                        onClick={ controlFavorite }
                        checked={ arrFavorite.includes(album.trackId) }
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
    }
    return <Loading />;
  }

  render() {
    return this.selectRender();
  }
}

MusicCard.propTypes = {
  albuns: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  arrFavorite: PropTypes.arrayOf(PropTypes.number),
}.isRequired;
