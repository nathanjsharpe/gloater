import {
  createStalk,
  deleteStalk,
} from 'Actions/stalk-actions';

import {
  CLICK_STALK,
} from 'Actions/action-types';

const admireMiddleware = store => next => action => {
  if (action.type === CLICK_STALK) {
    const { user } = action.payload;

    if (user.stalked) {
      store.dispatch(deleteStalk(user));
    } else {
      store.dispatch(createStalk(user));
    }
  }

  next(action);
}

export default admireMiddleware;
