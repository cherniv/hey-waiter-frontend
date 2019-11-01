import React from 'react';
import { Button } from 'react-bootstrap';
import BusinessDetails from './BusinessDetails';
import Business from '../models/Business';
import { observer } from 'mobx-react';

@observer
class NewUserGreeting extends React.Component {
  business = Business.new();
  render( ) {
    return (
      <div>
        <p>
        Hey Person! Welcome to Hey Waiter app! {"🎉"}
        </p>
        <p>
        The first thing you need to do is to type your restaurant' name:
        </p>
        
        <BusinessDetails 
          business={this.business} 
          showTitle={false}
          autoSave={false}
        />
        
        <p>
        <Button 
          onClick={async () => {
            await this.business.save();
            Auth.justSignedUp = false;
            Business.current = this.business;
          }} 
          variant="primary"
          disabled={!this.business.hasTitle}
        >
          Done
        </Button>
        </p>
      </div>
    )
  }
}


export default NewUserGreeting;
