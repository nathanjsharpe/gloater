import React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import AdmireButton from 'Components/gloats/AdmireButton';
import './Gloat.css';

const Gloat = ({ gloat, style }) => (
  <div className="Gloat" style={style}>
    <Card>
      <CardHeader
        title={gloat.user.name}
        subtitle={`@${gloat.user.username}`}
        avatar={gloat.user.image || 'http://placehold.it/150x150'}
      />
      <CardText>{gloat.content}</CardText>
      <CardActions>
        {gloat.hasOwnProperty('admired') && <AdmireButton admired={gloat.admired} />}
      </CardActions>
    </Card>
  </div>
);

export default Gloat;
