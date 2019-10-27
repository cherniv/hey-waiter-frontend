import React from 'react';
import Auth from '../services/Auth';

const AccountScreen: React.FC = () => {
  return (
    <div className="screen">
      <button onClick={Auth.signOut} className="link sign-out">Sign-out</button>
    </div>
  )
}

export default AccountScreen;