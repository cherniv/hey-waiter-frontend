import {observable, computed} from 'mobx';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import User from '../models/User';

class Auth {

  @observable authStateLoading:boolean = false;
  @observable user:any; 
  @observable firebaseUser:any; 
  @observable justSignedUp:boolean = !true;
  @observable token:any;
  @computed get isLoggedIn () {
    return !!this.user;
  }

  init () {
    this.authStateLoading = true;
    
    firebase.auth().onAuthStateChanged(async (firebaseUser: any) => {
      this.firebaseUser = firebaseUser;
      if (firebaseUser) {
        var token = await firebaseUser.getIdToken()
        this.token = token;
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