import React from 'react';
import Auth from '../services/Auth';
import { observer } from 'mobx-react';
import NewUserGreeting from './NewUserGreeting';
import NewWaiterGreeting from './NewWaiterGreeting';
import Live from './Live';
import Waiter from '../models/Waiter';

@observer
class HomeScreen extends React.Component {
  render() {
    return (
      <div className="screen">
        <br />
        {Auth.justSignedUp && !Waiter.isWaiter && <NewUserGreeting />}
        {Auth.justSignedUp && Waiter.isWaiter && <NewWaiterGreeting />}
        {!Auth.justSignedUp && <Live />}
      </div>
    )
  }
}

export default HomeScreen;