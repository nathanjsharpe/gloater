import React from 'react';
import { Link } from 'react-router';
import pure from 'recompose/pure';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import moment from 'moment';
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
      <CardText style={{paddingTop: '0px', paddingBottom: '0px'}}>
        <p>{gloat.content}</p>
        <p className="Gloat--timestamp">{moment(gloat.created_at).format('MMM D YYYY, h:mm a')}</p>
      </CardText>
      <CardActions>
        <AdmireButton gloat={gloat} />
      </CardActions>
    </Card>
  </div>
);

export default pure(Gloat);
