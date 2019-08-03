import React, { Component } from 'react';
import MovieBrowser from './modules/movie-browser/movie-browser.container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import $ from 'jquery';

class App extends Component {
  render() {
    return (
    
      <MuiThemeProvider>
        <MovieBrowser />
      </MuiThemeProvider>
     
    );
  }

}

export default App;