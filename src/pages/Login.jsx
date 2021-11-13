import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div data-testid="page-login" id="page-login">
        <h1>Login</h1>
        <form>
          <input data-testid="login-name-input" type="text" placeholder="Nome" />
          {/* <input type="password" placeholder="Senha" /> */}
          <button data-testid="login-submit-button" type="button">Entrar</button>
        </form>
      </div>
    );
  }
}
