import React from 'react';
import {connect} from 'react-redux';
import { Dialog } from 'material-ui';
import _ from 'lodash';
import { closeMovieModal } from './movie-modal.actions';
import { getMovieDetails } from '../movie-browser.actions';
import * as movieHelpers from '../movie-browser.helpers';
import Loader from '../../common/loader.component';

const styles = {
  dialogContent: (backgroundUrl) => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    height: '100%',
    minHeight: 400,
    color: 'white',
    padding: 10
  })
}

class MovieModalContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.movieId && this.props.movieId !== nextProps.movieId) {
      nextProps.getMovieDetails(nextProps.movieId);
    }
  }

  render() {
    const {isOpen, closeMovieModal, isLoading} = this.props;
    const loadingStatus = isLoading ? 'loading' : 'hide';
    const movie = movieHelpers.updateMoviePictureUrls(this.props.movie);
    const genres = (movie && movie.genres) ? movie.genres.map(genre => genre.name).join(', ') : '';

    return (
      <Dialog
        autoScrollBodyContent={true}
        title={null}
        modal={false}
        open={isOpen}
        onRequestClose={closeMovieModal}
      >
        <Loader isLoading={isLoading}>
          <div style={styles.dialogContent(movie.backdrop_path)}>
            <h2>{movie.title}</h2>
            <h5>{genres}</h5>
            <h6>Tagline: {movie.tagline}</h6>
            <p>Runtime: {movie.runtime}m</p>
            <p>{movie.overview}</p>
            <p>Budget: ${movie.budget}</p>
            <p>Popularity: {movie.popularity}</p>
          </div>
        </Loader>
    </Dialog>
    );
  }
}

export default connect(

  (state) => ({

    isOpen: _.get(state, 'movieBrowser.movieModal.isOpen', false),
    movieId: _.get(state, 'movieBrowser.movieModal.movieId'),
    movie: _.get(state, 'movieBrowser.movieDetails.response', {}),
    isLoading: _.get(state, 'movieBrowser.movieDetails.isLoading', false),
  }),
 
  { closeMovieModal, getMovieDetails }
)(MovieModalContainer);