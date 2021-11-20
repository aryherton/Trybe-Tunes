import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      albuns: [],
      artist: '',
      collection: '',
      idSearch: '',
    };

    this.getMusics = this.getMusics.bind(this);
  }

  componentDidMount() {
    this.getMusics();
  }

  async getMusics() {
    const { match: { params: { id } } } = this.props;
    await getMusics(id).then((promise) => {
      const arrPromise = promise.filter((e) => e.previewUrl);
      this.setState({
        albuns: arrPromise,
        artist: arrPromise[0].artistName,
        collection: arrPromise[0].collectionName,
        idSearch: id,
      });
    });
  }

  selectRender() {
    const { albuns, artist, collection } = this.state;
    if (albuns !== []) {
      return (
        <div data-testid="page-album" id="pageAlgum">
          <Header />
          <p data-testid="artist-name">
            { artist }
          </p>
          <p data-testid="album-name">
            { collection }
          </p>
          <MusicCard { ...this.state } />
        </div>
      );
    }
    return <Loading />;
  }

  render() {
    return this.selectRender();
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
