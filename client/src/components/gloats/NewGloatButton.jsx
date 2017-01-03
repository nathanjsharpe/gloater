import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux';
import * as gloatActions from 'Actions/gloat-actions';

const NewGloatButton = ({ clickNewGloat }) => (
  <FloatingActionButton
    secondary
    style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 100,
    }}
    onClick={clickNewGloat}
  >
    <ContentAdd />
  </FloatingActionButton>
);

export default connect(undefined, gloatActions)(NewGloatButton);
