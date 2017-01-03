import {
  FETCH_USER_SUCCESS,
  FETCH_GLOATS_SUCCESS,
} from 'Actions/action-types';

const userGloatsMiddleware = store => next => action => {
  if (action.type === FETCH_USER_SUCCESS) {
    const { user } = action.payload;
    const gloats = user.gloats.map(gloat => ({
      ...gloat,
      user: {
        image: user.image,
        name: user.name,
        username: user.username,
      },
    }));

    store.dispatch({
      type: FETCH_GLOATS_SUCCESS,
      payload: {
        timestamp: action.payload.timestamp,
        filter: 'user',
        links: {},
        gloats,
      },
    });
  }

  next(action);
}

export default userGloatsMiddleware;
