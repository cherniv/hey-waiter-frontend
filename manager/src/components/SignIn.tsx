import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase/app';


const UI_CONFIG = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};

class SignIn extends React.Component {
  render () {
    return (
      <div className="component-sign-in">
        <h1>Hey Manager!</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={UI_CONFIG} firebaseAuth={firebase.auth()}/>
      </div>
    )
  }
}

export default SignIn;