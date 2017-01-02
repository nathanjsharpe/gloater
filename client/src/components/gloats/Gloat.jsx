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
        avatar={gloat.user.image}
      />
      <CardText>
        {gloat.content}
      </CardText>
      <CardActions>
        <AdmireButton
          admired={gloat.admired}
          numAdmirers={gloat.admirers_count}
          disabled={!gloat.hasOwnProperty('admired')}
        />
      </CardActions>
    </Card>
  </div>
);

export default Gloat;
