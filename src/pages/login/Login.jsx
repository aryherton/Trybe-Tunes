import React, { Component } from 'react';
import { Redirect } from 'react-router';

import Loading from '../../components/Loading';
import { createUser } from '../../services/userAPI';

import { LoginWrapper } from './login';
import { gifPageLogin, footerImgPagesLogin01 } from '../../image';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      checkRegister: false,
      redir: false,
    };

    this.getInput = this.getInput.bind(this);
    this.setUser = this.setUser.bind(this);
    this.selectRender = this.selectRender.bind(this);
  }

  async setUser() {
    this.setState({ checkRegister: true }, async () => {
      const { nome } = this.state;
      await createUser({ name: nome, email: '', image: '', description: '' });
      this.setState({ redir: true, checkRegister: false });
    });
  }

  getInput(event) {
    event.preventDefault();
    const valNome = event.target.value;
    this.setState({ nome: valNome });
  }

  selectRender() {
    const { nome } = this.state;
    const lengthName = 3;
    return (
      <LoginWrapper data-testid="page-login" id="page-login">
        <main>
          <img src={ gifPageLogin } alt="gif-pages-login" id="gifPagesLogin"/>
          <form>
            <input
              data-testid="login-name-input"
              type="text"
              placeholder="Digite seu nome"
              onChange={ this.getInput }
            />
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ nome.length < lengthName }
              onClick={ this.setUser }
            >
              Entrar
            </button>
          </form>
        </main>
        <footer>
          <img src={ footerImgPagesLogin01 } alt="img-trybeTunes-footer" />
        </footer>
      </LoginWrapper>
    );
  }

  render() {
    const { checkRegister, redir } = this.state;
    if (checkRegister) {
      return <Loading />;
    } if (redir) {
      return <Redirect to="/search" />;
    }
    return this.selectRender();
  }
}
