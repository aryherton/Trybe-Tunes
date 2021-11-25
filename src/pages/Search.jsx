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
      // collectionName: '',
      album: [],
      disabledButt: true,
      loading: false,
    };

    this.checkChar = this.checkChar.bind(this);
    this.searchFunction = this.searchFunction.bind(this);
  }

  async searchFunction() {
    this.setState({ loading: true }, async () => {
      const { valueInput } = this.state;
      const returnAlbum = await searchAlbumsAPI(valueInput);

      if (returnAlbum.length > 0) {
        this.setState({
          album: returnAlbum,
          nameArtist: returnAlbum[0].artistName,
          // collectionName: returnAlbum[0].collectionName,
          strAlertNotAlbum: '',
        });
      } else {
        this.setState({
          album: [],
          nameArtist: '',
          strAlertNotAlbum: 'Nenhum álbum foi encontrado' });
      }
    });
    this.setState({ loading: false });
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
    const { album, nameArtist, loading, disabledButt, strAlertNotAlbum } = this.state;
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
