import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const {
      checkedFavorite, previewUrl, addAndRemovFavorite,
      trackId, trackName, deletMuscFavor } = this.props;
    return (
      <div>
        <p data-testid="album-price">{ trackName }</p>
        <label
          htmlFor={ trackId }
          value="Favorita"
        >
          <input
            type="checkbox"
            id={ `input-favorite-${trackId}` }
            value={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ addAndRemovFavorite }
            onClick={ deletMuscFavor }
            checked={ checkedFavorite }
          />
        </label>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          { 'O seu navegador não suporta o elemento' }
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  checkedFavorite: PropTypes.bool,
  previewUrl: PropTypes.string,
  addAndRemovFavorite: PropTypes.func,
  trackId: PropTypes.number,
  trackName: PropTypes.string,
}.isRequired;
