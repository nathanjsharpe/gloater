import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import * as gloatActions from 'Actions/gloat-actions';
import './Gloats.css';
import GloatList from './GloatList';

class Gloats extends Component {
  componentWillMount() {
    const { fetchGloats, params } = this.props;

    fetchGloats(params.filter || 'recent');
  }

  render() {
    const { currentUser, params, fetchGloats, fetchUserGloats } = this.props;

    return (
      <Tabs
        value={params.filter || 'recent'}
        className="Gloats"
      >
        {currentUser && (
          <Tab
            label="My Feed"
            value="current"
            containerElement={<Link to="/gloats/current" />}
            onActive={() => fetchUserGloats(currentUser)}
          >
            <GloatList filter="current" />
          </Tab>
        )}
        <Tab
          value="recent"
          label="Recent"
          containerElement={<Link to="/gloats/recent" />}
          onActive={() => fetchGloats('recent')}
        >
          <GloatList filter="recent" />
        </Tab>
        <Tab
          value="popular"
          label="Popular"
          containerElement={<Link to="/gloats/popular" />}
          onActive={() => fetchGloats('popular')}
        >
          <GloatList filter="popular" />
        </Tab>
        {currentUser && (
          <Tab
            value="stalked"
            label="Stalked"
            containerElement={<Link to="/gloats/stalked" />}
            onActive={() => fetchGloats('stalked')}
          >
            <GloatList filter="stalked" />
          </Tab>
        )}
        {currentUser && (
          <Tab
            value="admired"
            label="Admired"
            containerElement={<Link to="/gloats/admired" />}
            onActive={() => fetchGloats('admired')}
          >
            <GloatList filter="admired" />
          </Tab>
        )}
      </Tabs>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

export { Gloats };
export default connect(mapStateToProps, gloatActions)(Gloats);
