import React from 'react';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import FlatButton from 'material-ui/FlatButton';
import * as admireActions from 'Actions/admire-actions';
import { connect } from 'react-redux';

const COLOR = '#EC407A';

const AdmireButton = ({ gloat, clickAdmire }) => (
  <FlatButton
    icon={gloat.admired ?
      <ActionFavorite color={COLOR} /> :
      <ActionFavoriteBorder color={COLOR} />
    }
    label={gloat.admirers_count}
    labelStyle={{ color: COLOR }}
    disabled={!gloat.hasOwnProperty('admired')}
    onClick={() => gloat.hasOwnProperty('admired') && clickAdmire(gloat)}
  />
);

export { AdmireButton };
export default connect(undefined, admireActions)(AdmireButton);
