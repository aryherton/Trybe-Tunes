import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

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
      loading: false,
      arrChecked: [],
    };

    this.getMusics = this.getMusics.bind(this);
    this.selectRender = this.selectRender.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.controlFavorite = this.controlFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  componentDidMount() {
    this.getMusics();
  }

  async getMusics() {
    const { match: { params: { id } } } = this.props;

    const arrPromise = await getMusics(id);
    // arrPromise = arrPromise.filter((e) => e.previewUrl);
    this.setState({
      albuns: arrPromise,
      artist: arrPromise[0].artistName,
      collection: arrPromise[0].collectionName,
    });
  }

  async controlFavorite(event) {
    const { arrChecked } = this.state;

    await this.setState({ loading: true });

    if (!arrChecked.includes(event.target.value)) {
      this.addFavorite(event);
    } else {
      this.deleteFavorite(event);
    }
  }

  async addFavorite(event) {
    const { arrChecked, albuns } = this.state;

    arrChecked.push(event.target.value);
    this.setState({ arrChecked }, async () => {
      albuns.forEach(async (album) => {
        if (album.trackId === Number(event.target.value)) {
          await addSong(album);
        }
      });
      this.setState({ loading: false });
    });
  }

  async deleteFavorite(event) {
    const { arrChecked, albuns } = this.state;
    const newArr = arrChecked.filter((item) => item !== event.target.value);

    this.setState({ arrChecked: newArr }, async () => {
      albuns.forEach(async (album) => {
        if (album.trackId === Number(event.target.value)) { await removeSong(album); }
      });
      this.setState({ loading: false });
    });
  }

  selectRender() {
    const { albuns, artist, collection } = this.state;
    console.log(artist, collection);
    if (albuns.length > 0) {
      return (
        <div data-testid="page-album" id="pageAlgum">
          <Header />
          <p data-testid="artist-name">{artist}</p>
          <p data-testid="album-name">{collection}</p>
          <MusicCard
            {
              ...this.state }
            controlFavorite={ this.controlFavorite }
          />
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
