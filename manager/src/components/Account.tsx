import React from 'react';
import Auth from '../services/Auth';
import {
  Button,
  Form,
} from 'react-bootstrap';
import Avatar from './Avatar';
import { withRouter, RouteComponentProps } from 'react-router-dom';

class AccountScreen extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div className="screen">
        <h2>Account</h2>
        <br />
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Business Title</Form.Label>
            <Form.Control type="name" placeholder="Enter title" />
          </Form.Group>
        </Form>
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