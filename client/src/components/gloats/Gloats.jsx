import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Gloats.css';
import Gloat from './Gloat';
import {Tabs, Tab} from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress';
import * as gloatActions from 'Actions/gloat-actions';

const Gloats = ({ gloats, loading, fetchGloats, currentUser }) => (
  <Tabs>
    <Tab label="My Feed">
      <h2>My Gloats</h2>
    </Tab>
    <Tab label="Recent" onActive={() => fetchGloats('currentUser')}>
      <div className="Gloats">
        {loading && <CircularProgress />}
        {!loading && gloats && gloats.map((gloat, index) => (
          <Gloat
            key={gloat.id}
            gloat={gloat}
            style={{animationDelay: `${0.03 * index}s`}}
          />
        ))}
      </div>
    </Tab>
    <Tab label="Popular" onActive={() => fetchGloats('popular')}>
      <div className="Gloats">
        {loading && <CircularProgress />}
        {!loading && gloats && gloats.map((gloat, index) => (
          <Gloat
            key={gloat.id}
            gloat={gloat}
            style={{animationDelay: `${0.03 * index}s`}}
          />
        ))}
      </div>
      <h2>Popular</h2>
    </Tab>
    {currentUser && (
      <Tab label="Stalked" onActive={() => fetchGloats('stalked')}>
        <div className="Gloats">
          {loading && <CircularProgress />}
          {!loading && gloats && gloats.map((gloat, index) => (
            <Gloat
              key={gloat.id}
              gloat={gloat}
              style={{animationDelay: `${0.03 * index}s`}}
            />
          ))}
        </div>
        <h2>Popular</h2>
      </Tab>
    )}
    {currentUser && (
      <Tab label="Admired" onActive={() => fetchGloats('admired')}>
        <div className="Gloats">
          {loading && <CircularProgress />}
          {!loading && gloats && gloats.map((gloat, index) => (
            <Gloat
              key={gloat.id}
              gloat={gloat}
              style={{animationDelay: `${0.03 * index}s`}}
            />
          ))}
        </div>
        <h2>Popular</h2>
      </Tab>
    )}
  </Tabs>
);

const mapStateToProps = state => ({
  gloats: Object.keys(state.gloats.byId).map(id => state.gloats.byId[id]),
  loading: state.gloats.loading,
  currentUser: state.auth.currentUser,
});

export { Gloats };
export default connect(mapStateToProps, gloatActions)(Gloats);
