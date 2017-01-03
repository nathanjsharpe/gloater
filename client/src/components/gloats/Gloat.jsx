import React from 'react';
import { Link } from 'react-router';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import AdmireButton from 'Components/gloats/AdmireButton';
import './Gloat.css';

const Gloat = ({ gloat, style }) => (
  <div className="Gloat" style={style}>
    <Card>
      <CardHeader
        className="Gloat--header"
        title={<Link to={`/users/${gloat.user.username}`}>{gloat.user.name}</Link>}
        subtitle={<Link to={`/users/${gloat.user.username}`}>@{gloat.user.username}</Link>}
        avatar={gloat.user.image}
      />
      <CardText>
        {gloat.content}
      </CardText>
      <CardActions>
        <AdmireButton gloat={gloat} />
      </CardActions>
    </Card>
  </div>
);

export default Gloat;
