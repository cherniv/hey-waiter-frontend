import Auth from '../services/Auth';
import { when } from 'mobx';

class Initializer {
  async init () {

    await Auth.init();

    when(
      () => Auth.isLoggedIn,
      async () =>  {
        console.log('WHEN', Auth.user.id);
        //User.fetchFromRemote(Auth.user.uid);
        //Business.fetchFromRemote();
      }
    )
  }
}

export default new Initializer();