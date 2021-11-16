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
      album: [],
      disabledButt: true,
      loading: false,
    };

    this.checkChar = this.checkChar.bind(this);
    this.searchFunction = this.searchFunction.bind(this);
    this.selectRender = this.selectRender.bind(this);
    this.getArtist = this.getArtist.bind(this);
  }

  getArtist() {
    const { nameArtist } = this.state;
    if (nameArtist) {
      return (
        <div>
          <h2>
            Resultado de álbuns de:
            {' '}
            { nameArtist }
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
        { this.getArtist() }
        {
          (
            album.length > 0
              ? <ListAlbum { ...this.state } />
              : 'Nenhum álbum foi encontrado'
          )
        }
      </div>
    );
  }

  async searchFunction() {
    this.setState({ loading: true });

    const num = 1000;
    const { valueInput } = this.state;
    const returnAlbum = await searchAlbumsAPI(valueInput);

    setTimeout(() => {
      this.setState({ loading: false });
    }, num);
    this.setState({ nameArtist: valueInput, album: returnAlbum });
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
