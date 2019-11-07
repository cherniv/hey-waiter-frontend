import React from 'react';
import Auth from '../services/Auth';
import { observer } from 'mobx-react';
import NewUserGreeting from './NewUserGreeting';
import NewWaiterGreeting from './NewWaiterGreeting';
import Live from './Live';

@observer
class HomeScreen extends React.Component {
  render() {
    return (
      <div className="screen">
        <h2>Dashboard</h2>
        <br />
        {Auth.justSignedUp && !Auth.isWaiter && <NewUserGreeting />}
        {Auth.justSignedUp && Auth.isWaiter && <NewWaiterGreeting />}
        {!Auth.justSignedUp && <Live />}
      </div>
    )
  }
}

export default HomeScreen;