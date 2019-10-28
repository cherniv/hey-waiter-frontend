import React from 'react';
import Auth from '../services/Auth';
import {
  Button,
} from 'react-bootstrap';
import { observer } from 'mobx-react';

const JustSignedUp: React.FC = () => {
  return (
    <div>
      Hey! Welcome
      <br />
      <Button onClick={()=>Auth.justSignedUp = false} variant="primary">
        Done
      </Button>
    </div>
  )
}

@observer
class HomeScreen extends React.Component {
  render() {
    return (
      <div className="screen">
        <h2>Dashboard</h2>
        <br />
        {Auth.justSignedUp && <JustSignedUp/>}
        {!Auth.justSignedUp && 'Nothing new'}
      </div>
    )
  }
}

export default HomeScreen;