import React from 'react';
import Auth from '../services/Auth';
import {
  Button,
} from 'react-bootstrap';
import Avatar from './Avatar';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import BusinessDetails from './BusinessDetails';
import Business from '../models/Business';

class AccountScreen extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div className="screen">
        <h2>Account</h2>
        <br />
        {Business.first && <BusinessDetails business={Business.first} />}
        <br />
        <Button 
          onClick={() => {
            Auth.signOut();
            this.props.history.push('/');
          }} 
          variant="danger"
        >
          <Avatar />
          {' '}
          {'Sign Out'}
        </Button>
      </div>
    )
  }
}

export default withRouter(AccountScreen);