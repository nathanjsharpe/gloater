import React from 'react';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import FlatButton from 'material-ui/FlatButton';

const AdmireButton = ({ admired }) => (
  <FlatButton
    icon={admired ?
      <ActionFavorite color="#EC407A" /> :
      <ActionFavoriteBorder color="#EC407A" />
    }
  />
)

export default AdmireButton;
