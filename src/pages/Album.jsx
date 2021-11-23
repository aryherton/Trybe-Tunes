/* eslint-disable indent */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

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
      arrObjFavorite: [],
      loading: false,
    };

    this.getArrMusic = this.getArrMusic.bind(this);
    this.createArrObjFavorite = this.createArrObjFavorite.bind(this);
    this.addAndRemovFavorite = this.addAndRemovFavorite.bind(this);
  }

  componentDidMount() {
    this.getArrMusic();
    this.createArrObjFavorite();
  }

  componentDidUpdate() {
    this.createArrObjFavorite();
  }

  async getArrMusic() {
    const { match: { params: { id } } } = this.props;

    let arrPromise = await getMusics(id);
    arrPromise = arrPromise.filter((objMusc) => objMusc.previewUrl);

    this.setState({
      albuns: arrPromise,
      artist: arrPromise[0].artistName,
      collection: arrPromise[0].collectionName,
    });
  }

  createArrObjFavorite = async () => {
    let newArrFavor = await getFavoriteSongs();
    if (!newArrFavor) {
      newArrFavor = [];
    }
    this.setState({ arrObjFavorite: newArrFavor });
  }

  async addAndRemovFavorite(event) {
    this.setState({ loading: true });
    const { albuns } = this.state;
    const musc = albuns
    .filter((objMusc) => objMusc.trackId === Number(event.target.value));
    if (event.target.checked) {
      await addSong(musc[0]);
      this.setState({ loading: false });
    } else {
      await removeSong(musc[0]);
      this.setState({ loading: false });
    }
  }

  // selectRender() {

  // }

  render() {
    const { albuns, artist, collection, arrObjFavorite, loading } = this.state;
    // Com colaboração de Bruno Marques, turma-16-b.
    return (
      <>
        <Header />
        <div data-testid="page-album" id="pageAlgum">
          <p data-testid="artist-name">{artist}</p>
          <p data-testid="album-name">{collection}</p>
          {!loading ? (
          albuns.map((musc) => (
            <div key={ musc.trackId }>
              <MusicCard
                checkedFavorite={ arrObjFavorite
                  .some((item) => item.trackId === musc.trackId) }
                { ...musc }
                addAndRemovFavorite={ this.addAndRemovFavorite }
              />
            </div>)))
          : (<Loading />)}
        </div>
      </>
        );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
