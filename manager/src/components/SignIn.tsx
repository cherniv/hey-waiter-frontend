import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase/app';

import SigninLogo from '../images/sidebar-logo.png';

import Auth from '../services/Auth';
import { Button } from 'react-bootstrap';

const UI_CONFIG = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: (result:any) => {
      Auth.setSignupStatus(result.additionalUserInfo.isNewUser);
      return false;
    }
  }
};

class SignIn extends React.Component {
  render () {
    const isMobileApp = Auth.isMobileApp();
    return (
      <div className="component-sign-in">
        <br/>
        <br/>
        <img src={SigninLogo} className="signin-logo d-inline-block" alt="Logo" />
        <br/>
        <br/>
        {!isMobileApp && <h3>Waiter.Live Manager</h3>}
        <br/>
        {this.renderProviders()}
      </div>
    )
  }
  renderProviders(){
    const isMobileApp = Auth.isMobileApp();
    var el;
    if (!isMobileApp) {
      el = (
        <>
          {/*<p>Please sign-in:</p>*/}
          <StyledFirebaseAuth uiConfig={UI_CONFIG} firebaseAuth={firebase.auth()}/>
          {this.renderWaiterSignin()}
        </>
      );
    } else {
      el = this.renderWaiterSignin();
    }
    return el;
  }
  renderWaiterSignin() {
    const isMobileApp = Auth.isMobileApp();
    var text:string = isMobileApp ? 'Sign In' : 'Sign in as Waiter';
    return (
      <Button 
        variant={isMobileApp ? 'success' : 'link'}
        onClick={() => Auth.signInAsWaiter() } 
      >{text}</Button>
    )
  }
}

export default SignIn;