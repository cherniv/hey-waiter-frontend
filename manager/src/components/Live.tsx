import React from 'react';
import Business from '../models/Business';
import { observer } from 'mobx-react';
import Tables from './Tables';
import Waiters from './Waiters';

@observer
class Live extends React.Component {
  business = Business.current || Business.new();
  render( ) {
    if (!Business.current) return null;
    return (
      <div>
        <h3>Tables</h3>
        <Tables
          business={Business.current}
          editing={false}
        />
        <br />
        <h3>Waiters</h3>
        <Waiters
          business={Business.current}
          editing={false}
        />
        
      </div>
    )
  }
}


export default Live;
