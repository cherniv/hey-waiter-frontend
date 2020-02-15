import {observable, computed} from 'mobx';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import User from '../models/User';

async function getFreshToken() {
  return firebase.auth().currentUser.getIdToken();
}

class Auth {

  @observable authStateLoading:boolean = false;
  @observable user:any; 
  @observable firebaseUser:any; 
  @observable justSignedUp:boolean = false;
  @observable token:any;

  @computed get isAnonymous () {
    const {firebaseUser} = this;
    return firebaseUser && firebaseUser.isAnonymous;
  }
  @computed get isLoggedIn () {
    return !!this.user;
  }

  init () {
    this.authStateLoading = true;
    
    firebase.auth().onAuthStateChanged(async (firebaseUser: any) => {
      this.firebaseUser = firebaseUser;
      if (firebaseUser) {
        this.token = await getFreshToken()
        const {uid, displayName} = firebaseUser;
        if (this.justSignedUp) {
          await User.create({id: uid, name: displayName || ''});
        }
        await User.fetchFromRemote(firebaseUser.uid);
        this.user = User.first;
      } else {
        // logged out
        this.user = null;
      }
      this.authStateLoading = false;
    });
  }

  async getFreshTokenAndUpdate() {
    this.token = await getFreshToken();
  }

  async signInAsWaiter() {
    await firebase.auth().signInAnonymously();
    this.setSignupStatus(true);
  }

  setSignupStatus(justSignedUp:boolean = false) {
    this.justSignedUp = justSignedUp;
  }

  finishSignupProcess() {
    this.setSignupStatus(false); 
  }

  isMobileApp() {
      return window && window.location && window.location.href.includes('app=true')
  }

  signOut () {
    User.populate([]);
    if (this.isAnonymous) {
      this.user.destroy();
    }
    firebase.auth().signOut();
  }
}

export default new Auth();