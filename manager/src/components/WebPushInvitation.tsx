import * as React from 'react';
import Notifications from '../services/Notifications';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import {
  Button,
} from 'react-bootstrap';

@observer
export default class WebPushInvitation extends React.Component {
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

  render () {

    if (!this.shouldShowWebPushNotificationInvitation) return null;

    return (
      <>
        <h3>Notifications</h3>
        <Button onClick={this.askWebPushNotificationsPermissions}>
          Allow notifications
        </Button>
        <br />
        <br />
        </>
    )

  }
}