import React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import PinIcon from 'material-ui/svg-icons/maps/place';
import WorkIcon from 'material-ui/svg-icons/action/work';
import DateIcon from 'material-ui/svg-icons/action/date-range';
import StalkButton from './StalkButton';
import './UserCard.css';

const UserCard = ({ user, style }) => (
  <div className="UserCard" style={style}>
    <Card>
      <CardHeader
        title={user.name}
        subtitle={`@${user.username}`}
        avatar={user.image}
      />
      <CardText>
        <List>
          <ListItem
            leftAvatar={<Avatar icon={<PinIcon />} />}
            disabled
          >
            {user.city}, {user.state}
          </ListItem>
          <ListItem
            leftAvatar={<Avatar icon={<WorkIcon />} />}
            disabled
          >
            {user.profession} at {user.company}
          </ListItem>
          <ListItem
            leftAvatar={<Avatar icon={<DateIcon />} />}
            disabled
          >
            Member since {user.created_at}
          </ListItem>
        </List>
      </CardText>
      <CardActions>
        <StalkButton user={user} />
      </CardActions>
    </Card>
  </div>

);

export default UserCard;
