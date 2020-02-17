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
import Waiters from './Waiters';
import QrcodeIcon from '../images/qrcode-icon.png';
import Waiter from '../models/Waiter';
import Table from '../models/Table';

@observer
class AccountScreen extends React.Component<RouteComponentProps> {
  render() {
    if (Waiter.isWaiter) return this.renderSignoutButton();
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
        
        <BusinessDetails business={Business.current} showInstagram={true} />
        <br/>
        <h3>Tables</h3>
        <Tables business={Business.current} />
        <br/>
        <h3>Waiters</h3>
        <Waiters business={Business.current} />
        <br />
        <Button 
          variant="success"
          //size="lg"
          onClick={()=>{
            const params = {
              company: Business.current.title,
              tables: Business.current.tables.map(({id, customName, index}:Table)=>
                ({url:"https://waiter.live/#q" + id, name: 'Table #'+(customName || index)})
              )
            }
            localStorage.setItem(`qr_designer_query`, JSON.stringify(params));
            //params.tables = JSON.stringify(params.tables)
            //const url =  "../qrdesigner?" + new URLSearchParams(params);
            const url= "../qrdesigner";
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
        {this.renderSignoutButton()}
        <br/>
      </div>
    )
  }

  renderSignoutButton() {
    return (
      <Button 
        variant="link"
        onClick={() => {
          Auth.signOut();
          this.props.history.push('./');
        }} 
        
        //size='sm'
      >
        <Avatar />
        {' '}
        {'Sign Out'}
      </Button>
    )
  }
}

export default withRouter(AccountScreen);