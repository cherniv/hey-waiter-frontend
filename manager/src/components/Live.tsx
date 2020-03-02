import React from 'react';
import Business from '../models/Business';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Tables from './Tables';
import Waiters from './Waiters';
import AppState from '../models/AppState';
import Notifications from '../services/Notifications';
import {
  Button,
} from 'react-bootstrap';

@observer
class Live extends React.Component {
  business = Business.current || Business.new();
  @observable shouldShowWebPushNotificationInvitation:boolean = false;

  async componentDidMount() {
    this.checkWPN();
  }

  async checkWPN() {
    var iwpna = await Notifications.isWebPushNotificationsAvailable();
    if (iwpna) {
      var s = await Notifications.getWebPushSubscription();
      if (!s) this.shouldShowWebPushNotificationInvitation = true;
    }
  }

  askWebPushNotificationsPermissions = async () => {
    this.shouldShowWebPushNotificationInvitation = false;
    Notifications.askWebPushNotificationsPermissions();
  }

  render( ) {
    if (!Business.current) return null;
    return (
      <div>
        {this.shouldShowWebPushNotificationInvitation &&
          <>
          <h3>Notifications</h3>
          <Button onClick={this.askWebPushNotificationsPermissions}>
            Allow notifications
          </Button>
          <br />
          <br />
          </>
        }
        <h3>Tables</h3>
        <Tables
          business={Business.current}
          editing={false}
          bigIcons={AppState.iconIsBig}
        />
        <br />
        <h3>Waiters</h3>
        <Waiters
          business={Business.current}
          editing={false}
          bigIcons={AppState.iconIsBig}
        />
        
      </div>
    )
  }
}


export default Live;
