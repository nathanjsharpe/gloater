import {
  createAdmire,
  deleteAdmire,
} from 'Actions/admire-actions';

import {
  CLICK_ADMIRE,
} from 'Actions/action-types';

const admireMiddleware = store => next => action => {
  if (action.type === CLICK_ADMIRE) {
    const { gloat } = action.payload;

    if (gloat.admired) {
      store.dispatch(deleteAdmire(gloat));
    } else {
      store.dispatch(createAdmire(gloat));
    }
  }

  next(action);
}

export default admireMiddleware;
