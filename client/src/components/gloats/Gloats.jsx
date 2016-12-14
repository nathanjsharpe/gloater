import React, { Component } from 'react';
import Card from 'material-ui/Card';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import api from 'Util/api';

class Gloats extends Component {
  static defaultProps = {
    gloats: [],
  };

  componentDidMount() {
    console.log(process.env);
    api().gloats().get();
  }

  render() {
    const { gloats, loading } = this.props;

    return (
      <div className="Gloats">
        <RefreshIndicator
          status={loading ? 'loading' : 'hide'}
        />
        {gloats.map(gloat => <Card />)}
      </div>
    );
  }
}

export { Gloats };
export default Gloats;
