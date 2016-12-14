import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

const Gloat = ({ gloat }) => (
  <Card className="Gloat">
    <CardHeader
      title={gloat.user.name}
      subtitle={gloat.user.username}
      avatar={gloat.user.image}
    />
    <CardText>{gloat.content}</CardText>
  </Card>
);

export default Gloat;
