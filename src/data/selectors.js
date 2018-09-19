import { createSelector } from 'redux-orm';
import orm from 'src/data';

const dbStateSelector = state => state.data;


const movieListSelector = createSelector(
  orm,
  dbStateSelector,
  (state, props) => props,
  (session, props) => {
    console.log(props);
    return session.Movie.all().toModelArray().map(movie =>
       Object.assign({}, movie.ref)
    );
  }

);


const commentListSelector = createSelector(
  orm,
  dbStateSelector,
  (state, props) => props,
  (session, props) => {
    console.log(props);
    return session.MovieComment.all().toModelArray().map((comment) => {
      const obj = comment.normalize();
      return Object.assign({}, obj);
    });
  }
);


const movieDetailSelector = createSelector(
    orm,
    dbStateSelector,
    (state, props) => props,
    (session, props) => {
      // Get object ID from navigation's params
      const { navigation } = props;
      let movieDetail = { ...navigation.state.params };
      const id = navigation.getParam('id', '');

      // Filter Out the Movie Entity And Bind it with the detail page.
      if ((id || id === 0) && session.Movie.idExists(id)) {
        movieDetail = session.Movie.withId(id).normalize();
      }
      return movieDetail;
    }
);


export {
  movieListSelector,
  commentListSelector,
  movieDetailSelector };
