import Auth from '../services/Auth';
import { when } from 'mobx';
import Business from '../models/Business';
import Table from '../models/Table';
import './api.initializer'
import firebase from 'firebase/app';
import Waiter from '../models/Waiter';
Table.Firebase = firebase;
Waiter.Firebase = firebase;

class Initializer {
  async init () {

    await Auth.init();

    when(
      () => Auth.isLoggedIn,
      async () =>  {
        if (!Auth.justSignedUp) await Business.fetchMyBusinesses();
        if (Business.first) Business.current = Business.first;
        // Special case for fired or redeemed waiter:
        if (!Business.first && Waiter.isWaiter && !Auth.justSignedUp) {
          Auth.signOut();
        }
      }
    )
  }
}

export default new Initializer();