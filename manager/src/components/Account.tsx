import React from 'react';
import Auth from '../services/Auth';

const AccountScreen: React.FC = () => {
  return (
    <div className="screen">
      <a onClick={Auth.signOut} className="link sign-out">Sign-out</a>
    </div>
  )
}

export default AccountScreen;