import React from 'react';
import SocialPeople from 'material-ui/svg-icons/social/people';
import SocialPeopleOutline from 'material-ui/svg-icons/social/people-outline';
import FlatButton from 'material-ui/FlatButton';
import * as admireActions from 'Actions/admire-actions';
import { connect } from 'react-redux';

const COLOR = '#3F51B5';

const StalkButton = ({ user, clickAdmire }) => (
  <FlatButton
    icon={user.stalked ?
      <SocialPeople color={COLOR} /> :
      <SocialPeopleOutline color={COLOR} />
    }
    label={user.stalkers_count || '0'}
    labelStyle={{ color: COLOR }}
    disabled={!user.hasOwnProperty('stalked')}
    onClick={() => user.hasOwnProperty('stalked') && clickAdmire(user)}
  />
);

export { StalkButton };
export default connect(undefined, admireActions)(StalkButton);
