import React from 'react';
import Business from '../models/Business';
import { observer } from 'mobx-react';
import Tables from './Tables';

@observer
class Live extends React.Component {
  business = Business.current || Business.new();
  render( ) {
    if (!Business.current) return null;
    return (
      <div>
        <Tables
          business={Business.current}
          editing={false}
        />
        
      </div>
    )
  }
}


export default Live;
