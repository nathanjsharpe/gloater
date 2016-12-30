import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {
  getGloatsByFilter,
  getNextPageLinkByFilter,
} from 'Selectors/gloats';
import * as gloatActions from 'Actions/gloat-actions';
import Gloat from './Gloat';
import './GloatList.css';

const GloatList = ({ filter, loading, gloats, nextPageUrl, fetchGloats }) => (
  <div className="GloatList">
    {gloats && gloats.map((gloat, index) => (
      <Gloat
        key={gloat.id}
        gloat={gloat}
        // style={{animationDelay: `${0.03 * index}s`}}
      />
    ))}
    {loading && <CircularProgress style={{ width: '100%', textAlign: 'center', padding: '1em' }} />}
    {!loading && nextPageUrl &&
      <RaisedButton
        fullWidth
        onClick={() => fetchGloats(filter, nextPageUrl)}
      >
        Load more gloats...
      </RaisedButton>
    }
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  gloats: getGloatsByFilter(state.gloats, ownProps.filter),
  nextPageUrl: getNextPageLinkByFilter(state.gloats, ownProps.filter),
  loading: state.gloats.loading,
});

export { GloatList };
export default connect(mapStateToProps, gloatActions)(GloatList);
