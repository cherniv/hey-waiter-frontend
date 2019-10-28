import {observable, computed} from 'mobx';
import firebase from 'firebase/app';
import "firebase/auth";

class Auth {

  @observable authStateLoading:boolean = false;
  @observable user:any; 
  @observable justSignedUp:boolean = false;
  @computed get isLoggedIn () {
    return !!this.user;
  }

  init () {
    this.authStateLoading = true;
    
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      this.authStateLoading = false;
    });
  }

  signOut () {
    firebase.auth().signOut();
  }
}

export default new Auth();