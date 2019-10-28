import React from 'react';
import Auth from '../services/Auth';
import {
  Button,
  Form,
  Image,
} from 'react-bootstrap';
import Avatar from './Avatar';

const AccountScreen: React.FC = () => {
  return (
    <div className="screen">
      <Form>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Business Title</Form.Label>
          <Form.Control type="name" placeholder="Enter title" />
        </Form.Group>
      </Form>
      <br />
      <br />
      <Button onClick={Auth.signOut} variant="danger">
        <Avatar />
        {' '}
        {'Sign Out'}
      </Button>
    </div>
  )
}

export default AccountScreen;