import React from 'react';
import Auth from '../services/Auth';
import {
  Form,
  Button,
  Col,
  OverlayTrigger,
  Tooltip,
  Image,
} from 'react-bootstrap';
import Avatar from './Avatar';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import BusinessDetails from './BusinessDetails';
import Business from '../models/Business';
import {observer} from 'mobx-react';
import Tables from './Tables';
import QrcodeIcon from '../images/qrcode-icon.png';

@observer
class AccountScreen extends React.Component<RouteComponentProps> {
  render() {
    if (!Business.current) return null;
    return (
      <div className="screen">
        <h2>Account</h2>
        <br />
        <Form.Label>Choose Restaurant</Form.Label>
        <Form.Row>
          <Form.Group as={Col} md={10} controlId="formGridBusiness">
            <Form.Control as="select">
              <option>{Business.current.title}</option>
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
            <Button variant="secondary">+ Add Restaurant</Button>
          </OverlayTrigger>
          </Form.Group>
        </Form.Row>
        
        <BusinessDetails business={Business.current} />
        <br />
        <Tables business={Business.current} />
        <br />
        <Button 
          variant="success"
          //size="lg"
          onClick={()=>{
            const params = {
              company: Business.current.title,
              urls: Business.current.tables.map((table:any)=>
                "https://waiter.live/#q" + table.id
              )
            }
            params.urls = JSON.stringify(params.urls)
            const url =  "../qrdesigner?" + new URLSearchParams(params);
            window.open(url, '_blank');
          }}
        >
          <Image src={QrcodeIcon} width={18} height={18} roundedCircle /> 
          {' '}
          QR Designer</Button>
        {/*
        <iframe src="../qrdesigner" title="QRDesigner"></iframe>
        */}
        <br />
        <br />
        <Button 
          variant="link"
          onClick={() => {
            Auth.signOut();
            this.props.history.push('./manager/');
          }} 
          
          //size='sm'
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