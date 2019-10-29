import {observable, computed} from 'mobx';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import User from '../models/User';

class Auth {

  @observable authStateLoading:boolean = false;
  @observable user:any; 
  @observable justSignedUp:boolean = !true;
  @computed get isLoggedIn () {
    return !!this.user;
  }

  init () {
    this.authStateLoading = true;
    
    firebase.auth().onAuthStateChanged((firebaseUser: any) => {
      if (firebaseUser) {
        this.loadUserDataAfterSignin(firebaseUser);
      } else {
        // logged out
        this.user = null;
        this.authStateLoading = false;
      }
    });
  }

  async loadUserDataAfterSignin(firebaseUser: any) {
    await User.fetchFromRemote(firebaseUser.uid);
    this.user = User.first;
    this.authStateLoading = false;
  }

  signOut () {
    firebase.auth().signOut();
  }
}

export default new Auth();