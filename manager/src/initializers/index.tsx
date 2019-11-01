import Auth from '../services/Auth';
import { when } from 'mobx';
import Business from '../models/Business';
import './api.initializer'

class Initializer {
  async init () {

    await Auth.init();

    when(
      () => Auth.isLoggedIn,
      async () =>  {
        await Business.fetchMyBusinesses();
        if (Business.first) Business.current = Business.first;
      }
    )
  }
}

export default new Initializer();