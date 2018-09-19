import * as ActionTypes from 'src/data/actionTypes';
import moment from 'moment';
import _ from 'lodash';
import orm from 'src/data';


const createOrUpdateItem = (SomeModel, payload, idAttr) => {
  if (!payload || _.isEmpty(payload)) {
    return;
  }

  const idField = idAttr || 'id';
  const now = moment().format('lll');
  let itemPayload = { ...payload, modifiedDatetime: now };
  if (SomeModel.idExists(payload[idField])) {
    const someItem = SomeModel.withId(payload[idField]);
    someItem.update(itemPayload);
  } else {
    itemPayload = { ...payload, createdDatetime: now };
    SomeModel.create(itemPayload);
  }
};

const deleteItem = (SomeModel, itemId) => {
  if (SomeModel.idExists(itemId)) {
    const someItem = SomeModel.withId(itemId);
    someItem.delete();
  }
};

export const reducer = (dbState, action) => {
  let sess = orm.session(dbState);

    // Session-specific Models are available
    // as properties on the Session instance.
  const { Movie, MovieComment } = sess;

  switch (action.type) {
    case ActionTypes.EMPTY_ORM: {
      orm.getEmptyState();
      const initialState = orm.getEmptyState();
      sess = orm.session(initialState);
      break;
    }
    case ActionTypes.CREATE_OR_UPDATE_MOVIE: {
      const { movie: moviePayload } = action;
      createOrUpdateItem(Movie, moviePayload);
      break;
    }
    case ActionTypes.DELETE_MOVIE: {
      const { id: movieID } = action;
      deleteItem(Movie, movieID);
      break;
    }
    case ActionTypes.CREATE_MOVIE_COMMNENT: {
      const { comment: commentPayload } = action;
      createOrUpdateItem(MovieComment, commentPayload);
      break;
    }
    default:
      // Noting need to be done, pass
      break;
  }

  return sess.state;
};
