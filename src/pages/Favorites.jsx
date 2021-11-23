import React, { Component } from 'react';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

// import Loading from '../components/Loading';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      collection: '',
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

  async deletMuscFavor(event) {
    let newArr = await getFavoriteSongs();
    newArr = await newArr.filter((item) => item.trackId === Number(event.target.value));
    await removeSong(newArr[0]);
  }

  render() {
    const { arrObjFavorite, artist, collection } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          <p data-testid="artist-name">{artist}</p>
          <p data-testid="album-name">{collection}</p>
        </div>
        { arrObjFavorite.length > 0
          && (arrObjFavorite.map((musc) => (
            <section className="list-favorites" key={ musc.trackId }>
              <MusicCard
                { ...musc }
                deletMuscFavor={ this.deletMuscFavor }
                checkedFavorite={ arrObjFavorite
                  .some((item) => item.trackId === musc.trackId) }
              />
            </section>
          )))}
      </div>
    );
  }
}
