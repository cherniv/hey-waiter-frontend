import React from 'react';
import { Button } from 'react-bootstrap';
import Business from '../models/Business';
import { observer } from 'mobx-react';
import Auth from '../services/Auth';
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
