import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextInput from 'Components/forms/TextInput';
import * as gloatActions from 'Actions/gloat-actions';
import validate from 'Util/validation/validateGloatForm';

const NewGloatDialog = ({
  open,
  values,
  closeNewGloat,
  createGloat,
  handleSubmit,
  submitting,
  error,
  exampleGloat,
}) => (
  <Dialog
    open={open}
    onRequestClose={closeNewGloat}
    actions={[
      <FlatButton
        label="Cancel"
        onTouchTap={closeNewGloat}
      />,
      <FlatButton
        label="Submit"
        primary
        onTouchTap={handleSubmit(createGloat)}
      />,
    ]}
  >
    <p>What do you want to gloat about?</p>
    <form onSubmit={handleSubmit(createGloat)}>
      <Field
        name="content"
        component={TextInput}
        floatingLabelText="Gloat here, but keep it to 140 characters or less."
        hintText={exampleGloat}
        autoFocus
        fullWidth
        disabled={submitting}
      />
    </form>
  </Dialog>
);

const mapStateToProps = state => ({
  open: state.dialog.newGloatOpen,
  exampleGloat: state.dialog.exampleGloat,
});

export { NewGloatDialog };
export default compose(
  connect(mapStateToProps, gloatActions),
  reduxForm({
    form: 'gloatForm',
    validate,
  })
)(NewGloatDialog);
