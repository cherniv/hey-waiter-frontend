import React from 'react';
import { Button } from 'react-bootstrap';
import BusinessDetails from './BusinessDetails';
import Business from '../models/Business';
import { observer } from 'mobx-react';
import Auth from '../services/Auth';
import { observable } from 'mobx';
//import Tables from './Tables';
import Table from '../models/Table';
import {
    Form,
    Spinner,
  } from 'react-bootstrap';

@observer
class NewUserGreeting extends React.Component {
  business = Business.current || Business.new();
  @observable stage:number = 1;
  @observable initialTablesNumber = 1;
  @observable saving = false;
  render( ) {
    if (this.stage === 1) return this.renderStage1();
    if (this.stage === 2) return this.renderStage2();
  }

  renderStage1() {
    return (
      <div>
        <p>
        Hello and welcome to "Waiter.Live" app! {"🎉"}
        </p>
        <p>
        The first thing you need to do is to enter your restaurant's name:
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
          Next
        </Button>
        </p>
      </div>
    )
  }

  renderStage2 () {
    return (
      <div>
        <p>
        Great! Now add some tables and you are good to go!
        </p>
        
        <p>How many tables do you have? (You can skip this step now and add tables later in "Account" section ) </p>
        <Form.Control 
          type="number" placeholder="Type number here..." 
          onChange={({target}: any) => {
            this.initialTablesNumber = +target.value;
          }}
          value={''+this.initialTablesNumber}
        />
        
        {/*
        <Tables
          editing={true}
          business={this.business}
        />
        */}
        <br />
        <br />
        <Button 
          onClick={async () => {
            Auth.finishSignupProcess();
          }} 
          variant="secondary"
          disabled={this.saving}
        >
          Skip
        </Button>
        {' '}
        <Button 
          onClick={async () => {
            this.saving = true;
            if (this.initialTablesNumber) {
              await Table.createBunch(this.initialTablesNumber)
            }
            Auth.finishSignupProcess();
          }} 
          variant="success"
          disabled={this.saving}
          style={{minWidth: '66px'}}
        >
          {!this.saving ? 'Done' :
            <>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            </>
            }
        </Button>
        
      </div>
    )
  }
}


export default NewUserGreeting;
