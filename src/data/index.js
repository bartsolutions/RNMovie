// orm.js
import { ORM } from 'redux-orm';
import { Movie, MovieComment } from './models';

const orm = new ORM();
orm.register(Movie, MovieComment);

export default orm;
