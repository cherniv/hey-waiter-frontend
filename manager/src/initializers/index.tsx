import Auth from '../services/Auth';
import { reaction } from 'mobx';
import Business from '../models/Business';
import Table from '../models/Table';
import './api.initializer'
import firebase from 'firebase/app';
import Waiter from '../models/Waiter';
import Notifications from '../services/Notifications';
Table.Firebase = firebase;
Waiter.Firebase = firebase;

class Initializer {
  async init () {

    await Auth.init();

    reaction(
      () => Auth.isLoggedIn,
      async flag =>  {
        if (flag) {
          Notifications.askPermissions();
          if (!Auth.justSignedUp) await Business.fetchMyBusinesses();
          if (Business.first) Business.current = Business.first;
          if (!Business.first && !Waiter.isWaiter && !Auth.justSignedUp) {
              Auth.brokenSignupResume();
          }
          // Special case for fired or redeemed waiter:
          if (!Business.first && Waiter.isWaiter && !Auth.justSignedUp) {
            Auth.signOut();
          }
        }
      }
    )

    reaction (
      () => Auth.justSignedOut,
      flag => {
        if (flag) {
          Table.populate([]);
          Waiter.populate([]);
        }
      }
    )
  }
}

export default new Initializer();