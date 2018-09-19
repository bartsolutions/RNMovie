import { fk, attr, Model } from 'redux-orm';

class Movie extends Model {
  toString() {
    return `Movie: ${this.title}`;
  }
  normalize() {
    return Object.assign({}, this.ref, {
      comments: this.comments.toRefArray()
    });
  }
}
Movie.modelName = 'Movie';
Movie.fields = {
  id: attr(),
  createdDatetime: attr(),
  modifiedDatetime: attr(),
  title: attr(),
  content: attr(),
  imagerl: attr()
};

class MovieComment extends Model {
  toString() {
    return `Comment: ${this.cotent}`;
  }
  normalize() {
    return Object.assign({}, this.ref, {
      movie: this.movie.ref
    });
  }
}
MovieComment.modelName = 'MovieComment';
MovieComment.fields = {
  id: attr(),
  createdDatetime: attr(),
  modifiedDatetime: attr(),
  comment: attr(),
  movie: fk('Movie', 'comments')
};

export { Movie, MovieComment };
