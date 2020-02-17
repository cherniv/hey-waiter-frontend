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
        <h1>Tables</h1>
        <Tables
          business={Business.current}
          editing={false}
        />
        <h1>Waiters</h1>
        <Waiters
          business={Business.current}
          editing={false}
        />
        
      </div>
    )
  }
}


export default Live;
