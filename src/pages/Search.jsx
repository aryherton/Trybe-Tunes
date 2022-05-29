import React, { Component } from 'react';

import searchAlbumsAPI from '../services/searchAlbumsAPI';

import Header from '../components/header/Header';
import Loading from '../components/Loading';
import ListAlbum from '../components/ListAlbum';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      valueInput: '',
      nameArtist: '',
      strAlertNotAlbum: '',
      album: [],
      disabledButt: true,
      loading: false,
    };

    this.checkChar = this.checkChar.bind(this);
    this.searchFunction = this.searchFunction.bind(this);
  }

  async searchFunction() {
    this.setState({ loading: true });
    const { valueInput } = this.state;
    const returnAlbum = await searchAlbumsAPI(valueInput);

    if (returnAlbum.length > 0) {
      this.setState(() => ({
        album: returnAlbum,
      }));
    } else {
      this.setState(() => ({
        strAlertNotAlbum: 'Nenhum álbum foi encontrado',
      }));
    }
    this.setState({ loading: false, valueInput: '' });
  }

  checkChar({ target: { value } }) {
    this.setState({ nameArtist: value, valueInput: value });

    if (value.length > 1) {
      this.setState(() => ({ disabledButt: false }));
    } else {
      this.setState({ disabledButt: true });
    }
  }

  render() {
    const {
      album,
      loading,
      disabledButt, strAlertNotAlbum, nameArtist, valueInput } = this.state;
    return (
      <div data-testid="page-search" id="pageSearch">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            value={ valueInput }
            placeholder="Busque por artistas ou banda"
            onChange={ this.checkChar }
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
        <section>
          {
            loading && <Loading />
          }
          {
            (album.length > 0 && !loading)
              ? (
                <div>
                  <h2>
                    {`Resultado de álbuns de: ${nameArtist}` }
                  </h2>
                  <ListAlbum listAlbum={ album } />
                </div>)
              : (<span>{ strAlertNotAlbum }</span>)
          }
        </section>
      </div>
    );
  }
}
