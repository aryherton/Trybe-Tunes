import React, { Component } from 'react';

import searchAlbumsAPI from '../services/searchAlbumsAPI';

import Header from '../components/Header';
import Loading from '../components/Loading';
import ListAlbum from '../components/ListAlbum';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      valueInput: '',
      nameArtist: '',
      collectionName: '',
      album: '',
      checkReturnAlbum: false,
      disabledButt: true,
      loading: false,
    };

    this.checkChar = this.checkChar.bind(this);
    this.searchFunction = this.searchFunction.bind(this);
    this.selectRender = this.selectRender.bind(this);
    this.getArtist = this.getArtist.bind(this);
  }

  getArtist() {
    const { nameArtist, collectionName } = this.state;
    if (nameArtist) {
      return (
        <div>
          <h2>
            Resultado de álbuns de:
            {' '}
            { nameArtist }
            { collectionName }
          </h2>
        </div>
      );
    }
  }

  selectRender() {
    const { loading, disabledButt, album } = this.state;
    if (loading) {
      return (
        <Loading />
      );
    }

    return (
      <div data-testid="page-search" id="pageSearch">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            onChange={ this.checkChar }
            placeholder="Search"
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ disabledButt }
            onClick={ this.searchFunction }
          >
            Pesquisar
          </button>
        </form>
        <div>{ this.getArtist() }</div>
        {
          (
            album.length > 0
              && <ListAlbum { ...this.state } />
          )
        }
        <span>
          { ((album.length === 0 && album !== '') && 'Nenhum álbum foi encontrado') }
        </span>
      </div>
    );
  }

  async searchFunction() {
    this.setState({ loading: true }, async () => {
      const { valueInput } = this.state;
      const returnAlbum = await searchAlbumsAPI(valueInput);
      this.setState({ loading: false });
      if (returnAlbum.length > 0) {
        this.setState({
          album: returnAlbum,
          nameArtist: returnAlbum[0].artistName,
          collectionName: returnAlbum[0].collectionName,
        });
      } else {
        this.setState({ album: [], nameArtist: '' });
      }
    });
  }

  checkChar(event) {
    const inptLength = event.target.value.length;
    if (inptLength > 1) {
      const inputChar = event.target.value;
      this.setState({ valueInput: inputChar, disabledButt: false });
    } else {
      this.setState({ disabledButt: true });
    }
  }

  render() {
    return this.selectRender();
  }
}
