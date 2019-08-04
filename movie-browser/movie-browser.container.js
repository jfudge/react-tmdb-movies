import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {AppBar} from 'material-ui';
import * as movieActions from './movie-browser.actions';
import * as movieHelpers from './movie-browser.helpers';
import MovieList from './movie-list/movie-list.component';
import * as scrollHelpers from '../common/scroll.helpers';
import MovieModal from './movie-modal/movie-modal.container';

class MovieBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      currentMovies: []
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.props.getUpcoming(this.state.currentPage);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const {upcomingMovies} = this.props;
    if (!upcomingMovies.isLoading) {
      let percentageScrolled = scrollHelpers.getPercentageScrolledDown(window);
      if (percentageScrolled > .8) {
        const nextPage = this.state.currentPage + 1;
        this.props.getUpcoming(nextPage);
        this.setState({currentPage: nextPage});
      }
    }
  }


  render() {

    const {upcomingMovies} = this.props;
    const movies = movieHelpers.getMoviesList(upcomingMovies.response);

    return (
      <div>
        <AppBar className="titlebar"   />
        <div>
            <input className="search" placeholder="Enter search term"/>
        </div>
        <Container>
          <Row> </Row>
          <Row>
            <MovieList movies={movies} isLoading={upcomingMovies.isLoading} />
          </Row>
        </Container>
        <MovieModal />
      </div>
    );
  }
}

export default connect(

  (state) => ({
    upcomingMovies: state.movieBrowser.upcomingMovies
  }),

  { ...movieActions }
)(MovieBrowser);
