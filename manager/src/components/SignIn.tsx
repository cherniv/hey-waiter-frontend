import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase/app';
import SigninLogo from '../images/sidebar-logo.png';
import Auth from '../services/Auth';
import { 
    Button,
    Spinner,
} from 'react-bootstrap';
import {isMobileApp} from '../utils/Device'
import { observer } from 'mobx-react';
import {observable} from 'mobx';

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
        {!isMobileApp && <h3>Waiter.Live Manager</h3>}
        <br/>
        {this.renderProviders()}
      </div>
    )
  }
  renderProviders(){
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
    return <WaiterSigninButton />
  }
}

@observer
class WaiterSigninButton extends React.Component {
    @observable waiting = false;
    render () {
        var text:string = isMobileApp ? 'Sign In' : 'Sign in as Waiter';
        var innerEl:any = this.waiting ? this.renderSpinner() : text;
        return (
            <Button 
                variant={isMobileApp ? 'success' : 'link'}
                onClick={() => {
                    this.waiting = true;
                    Auth.signInAsWaiter() ;
                }} 
                style={{minWidth: '80px'}}
            >{innerEl}</Button>
        )
    }
    renderSpinner() {
        return (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
        )
    }
}

export default SignIn;