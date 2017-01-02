import React from 'react';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import FlatButton from 'material-ui/FlatButton';

const COLOR = '#EC407A';

const AdmireButton = ({ admired, numAdmirers, disabled = false }) => (
  <FlatButton
    icon={admired ?
      <ActionFavorite color={COLOR} /> :
      <ActionFavoriteBorder color={COLOR} />
    }
    label={numAdmirers || "0"}
    labelStyle={{ color: COLOR }}
    disabled={disabled}
  />
)

export default AdmireButton;
