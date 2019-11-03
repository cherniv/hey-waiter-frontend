import React from 'react';
import { Button } from 'react-bootstrap';
import BusinessDetails from './BusinessDetails';
import Business from '../models/Business';
import { observer } from 'mobx-react';
import Auth from '../services/Auth';
import { observable } from 'mobx';
import Tables from './Tables';

@observer
class NewUserGreeting extends React.Component {
  business = Business.current || Business.new();
  @observable stage:number = 1;
  render( ) {
    if (this.stage === 1) return this.renderStage1();
    if (this.stage === 2) return this.renderStage2();
  }

  renderStage1() {
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
            Business.current = this.business;
            this.stage = 2;
            // Auth.justSignedUp = false;
          }} 
          variant="success"
          disabled={!this.business.hasTitle}
        >
          Done
        </Button>
        </p>
      </div>
    )
  }

  renderStage2 () {
    return (
      <div>
        <p>
        Great! Now add some tables and you are good to go! (You can add more tables or remove them any time under "Account" section )
        </p>
        
        <Tables
          editing={true}
          business={this.business}
        />
        <br />
        <br />
        <Button 
          onClick={async () => {
            Auth.justSignedUp = false;
          }} 
          variant="success"
          disabled={!this.business.hasTables}
        >
          Done
        </Button>
        
      </div>
    )
  }
}


export default NewUserGreeting;
