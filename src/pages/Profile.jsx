import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import Header from '../components/Header';
import Loading from '../components/Loading';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
      emailUser: '',
      imgUser: '',
      describeUser: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getInfoUser();
  }

  getInfoUser = async () => {
    this.setState({ loading: true });
    const arrInfoUser = await getUser();
    console.log(arrInfoUser);
    this.setState({
      nameUser: arrInfoUser.name,
      emailUser: arrInfoUser.email,
      imgUser: arrInfoUser.image,
      describeUser: arrInfoUser.description,
      loading: false,
    });
  }

  render() {
    const { loading, nameUser, emailUser, imgUser, describeUser } = this.state;
    return (
      <div data-testid="page-profile" id="pageProfile">
        <Header />
        {loading
          ? <Loading />
          : (
            <div>
              <p>{ nameUser }</p>
              <p>{ emailUser }</p>
              <p>{ describeUser }</p>
              <img data-testid="profile-image" src={ imgUser } alt="Imagem do usuário" />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}
