import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

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

  setUser() {
    this.setState({ checkRegister: true });
    const { nome } = this.state;
    const num = 1000;
    setTimeout(() => {
      createUser({ name: nome, email: '', image: '', description: '' });
      this.setState({ redir: true });
      this.setState({ checkRegister: false });
    }, num);
  }

  getInput(event) {
    const valNome = event.target.value;
    this.setState({ nome: valNome });
  }

  selectRender() {
    const { nome } = this.state;
    const lengthName = 4;
    return (
      <div data-testid="page-login" id="page-login">
        <h1>Login</h1>
        <form>
          <input
            data-testid="login-name-input"
            type="text"
            placeholder="Nome"
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
      </div>
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
