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
        //console.log('WHEN', Auth.user.id);
        await Business.getMyBusinesses();
        Business.current = Business.first; // @TODO
      }
    )
  }
}

export default new Initializer();