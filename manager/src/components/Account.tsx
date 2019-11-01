import React from 'react';
import Auth from '../services/Auth';
import {
  Form,
  Button,
  Col,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import Avatar from './Avatar';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import BusinessDetails from './BusinessDetails';
import Business from '../models/Business';
import {observer} from 'mobx-react';

@observer
class AccountScreen extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div className="screen">
        <h2>Account</h2>
        <br />
        <Form.Label>Choose business</Form.Label>
        <Form.Row>
          <Form.Group as={Col} md={10} controlId="formGridBusiness">
            <Form.Control as="select">
              <option>{Business.current && Business.current.title}</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} md={2} controlId="formGridAddBusiness">
          <OverlayTrigger
            key={"bottom"}
            placement={"bottom"}
            overlay={
              <Tooltip id={`tooltip-bottom`}>
                Coming soon!
              </Tooltip>
            }
          >
            <Button variant="secondary">+ Add Business</Button>
          </OverlayTrigger>
          </Form.Group>
        </Form.Row>
        <br />
        {Business.current && <BusinessDetails business={Business.current} />}
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