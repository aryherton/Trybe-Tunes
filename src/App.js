import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Search from './pages/search/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styledGlobal';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <GlobalStyle />
          <ThemeProvider theme={ theme }>
            <Switch>
              <Route path="/" exact component={ Login } />
              <Route path="/search" component={ Search } />
              <Route path="/album/:id" component={ Album } />
              <Route path="/favorites" component={ Favorites } />
              <Route path="/profile" exact component={ Profile } />
              <Route path="/profile/edit" component={ ProfileEdit } />
              <Route path="*" component={ NotFound } />
            </Switch>
          </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
