import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Gloats.css';
import Gloat from './Gloat';
import CircularProgress from 'material-ui/CircularProgress';
import * as gloatActions from 'Actions/gloat-actions';

class Gloats extends Component {
  componentDidMount() {
    const { fetchGloats } = this.props;
    fetchGloats();
  }

  render() {
    const { gloats, loading } = this.props;

    return (
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
    );
  }
}

const mapStateToProps = state => ({
  gloats: Object.keys(state.gloats.byId).map(id => state.gloats.byId[id]),
  loading: state.gloats.loading,
});

export { Gloats };
export default connect(mapStateToProps, gloatActions)(Gloats);
