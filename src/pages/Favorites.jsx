import React, { Component } from 'react';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

import Loading from '../components/Loading';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      collection: '',
      checkloading: false,
      arrObjFavorite: [],
    };
  }

  componentDidMount() {
    this.arrPageFavorites();
  }

  componentDidUpdate() {
    this.arrPageFavorites();
  }

  arrPageFavorites = async () => {
    const arrReturnFunctionGetFavorite = await getFavoriteSongs();
    if (arrReturnFunctionGetFavorite.length > 0) {
      this.setState({
        arrObjFavorite: arrReturnFunctionGetFavorite,
        artist: arrReturnFunctionGetFavorite[0].artistName,
        collection: arrReturnFunctionGetFavorite[0].collectionName,
      });
    }
  }

  deletMuscFavor = async (event) => {
    this.setState({ checkloading: true });
    let newArr = await getFavoriteSongs();
    newArr = await newArr.filter((item) => item.trackId === Number(event.target.value));
    await removeSong(newArr[0]);
    this.arrPageFavorites();
    this.setState({ checkloading: false });
  }

  render() {
    const { arrObjFavorite, artist, collection, checkloading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          <p data-testid="artist-name">{artist}</p>
          <p data-testid="album-name">{collection}</p>
        </div>
        { !checkloading
          ? (
            arrObjFavorite.map((musc) => (
              <section className="list-favorites" key={ musc.trackId }>
                <MusicCard
                  { ...musc }
                  deletMuscFavor={ this.deletMuscFavor }
                  checkedFavorite={ arrObjFavorite
                    .some((item) => item.trackId === musc.trackId) }
                />
              </section>
            ))
          )
          : (<Loading />)}
      </div>
    );
  }
}
