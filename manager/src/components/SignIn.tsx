import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase/app';

import SigninLogo from '../images/sidebar-logo.png';

import Auth from '../services/Auth';

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
    return (
      <div className="component-sign-in">
        <br/>
        <br/>
        <img src={SigninLogo} className="signin-logo d-inline-block" alt="Logo" />
        <br/>
        <br/>
        <h1>Hey Manager!</h1>
        <br/>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={UI_CONFIG} firebaseAuth={firebase.auth()}/>
      </div>
    )
  }
}

export default SignIn;