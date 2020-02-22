import React from 'react';
import Auth from '../services/Auth';
import {
  Form,
  Button,
  Col,
  OverlayTrigger,
  Tooltip,
  Image,
  Modal,
  FormCheck,
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
import {isMobileApp} from '../utils/Device';
import {observable} from 'mobx';

@observer
class AccountScreen extends React.Component<RouteComponentProps> {
  render() {
    if (Waiter.isWaiter) return this.renderWaiterAccount();
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
        <br/>
        {this.renderQrcodeButton()}
        {/*
        <iframe src="../qrdesigner" title="QRDesigner"></iframe>
        */}
        <br />
        <br />
        <br/>
        {isMobileApp && this.renderNotificationsSettings()}
        <br/>
        <br/>
        {this.renderSignoutButton()}
        <br/>
        <br/>
        <br/>
      </div>
    )
  }

  renderQrcodeButton() {
    return (
      <QrcodeButtonAndModal />
    )
  }

  renderNotificationsSettings() {
    const {
      notificationsEnabled,
      switchNotifications,
    } = Auth.user;
    return (
      <FormCheck
        id="switchNotificationsEnabled"
        type="switch"
        checked={notificationsEnabled}
        onChange={()=>switchNotifications()}
        label={"Notifications are " + (notificationsEnabled ? "ON" : "OFF")}
      />
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

  renderWaiterAccount () {
    return (
      <div className="screen">
        {this.renderNotificationsSettings()}
        <br></br>
        <br></br>
        {this.renderSignoutButton()}
      </div>
    )
  }
}

@observer
class QrcodeButtonAndModal extends React.Component {
  @observable isOpen = false;
  onPressQrcodeButton = () => {
    const params = {
      company: Business.current.title,
      tables: Business.current.tables.map(({id, customName, index}:Table)=>
        ({url:"https://waiter.live/#q" + id, name: 'Table #'+(customName || index)})
      )
    }
    localStorage.setItem(`qr_designer_query`, JSON.stringify(params));
    //params.tables = JSON.stringify(params.tables)
    //const url =  "../qrdesigner?" + new URLSearchParams(params);
    //const url= "../qrdesigner";
    //window.open(url, '_blank');
    this.isOpen = true;
  }
  render() {
    return (
      <>
      <Button 
        variant="success"
        //size="lg"
        onClick={this.onPressQrcodeButton}
      >
        <Image src={QrcodeIcon} width={18} height={18} roundedCircle /> 
        {' '}
        QR Designer
      </Button>
      <Modal 
        show={this.isOpen} 
        onHide={this.handleClose}
        centered
        //size="lg"
        dialogClassName="qrdesigner-modal"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>{
          this.isOpen && 
          <iframe 
            src="https://waiter.live/qrdesigner" 
            title="QR Designer"
            frameBorder="0"
            style={{width: '100%', height: '100%'}}
          ></iframe>
        }</Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
      </>
    )
  }
  handleClose = () => {
    this.isOpen = false;
  }
}

export default withRouter(AccountScreen);