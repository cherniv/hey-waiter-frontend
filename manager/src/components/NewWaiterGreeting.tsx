import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import { observer } from 'mobx-react';
import Auth from '../services/Auth';
import { observable } from 'mobx';
import Waiter from '../models/Waiter';

@observer
class NewUserGreeting extends React.Component {
  @observable stage:number = 1;
  @observable code:string = '';
  @observable shouldShowErrorCodeMessage:boolean = false;
  codeInput:any;
  render( ) {
    if (this.stage === 1) return this.renderStage1();
  }

  renderStage1() {
    return (
      <div>
        <p>
        Welcome to "Waiter.Live" app! {"🎉"}
        </p>
        <p>
        The only thing you need to do is to enter your special code here:
        </p>
        <Form.Control 
          placeholder="Type here..." 
          onChange={({target}: any) => {
            this.code = target.value;
          }}
          value={this.code}
          ref={(input:any) => { this.codeInput = input; }} 
        />
        <br />
        <p>
        <Button 
          onClick={async () => {
            try {
              var codeIsCorrect = await Waiter.waiterEnterByCode(this.code);
              if (codeIsCorrect) Auth.finishSignupProcess();
            } catch(e) {
              this.shouldShowErrorCodeMessage = true;
            }
          }} 
          variant="success"
          disabled={!this.code.length }
        >
          Check code
        </Button>
        </p>

        {this.renderErrorPopup()}
      </div>
    )
  }

  renderErrorPopup() {
    return (
      <Modal 
          show={this.shouldShowErrorCodeMessage} 
          onHide={() => this.shouldShowErrorCodeMessage = false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Oops</Modal.Title>
          </Modal.Header>
          <Modal.Body>The code is not correct, can you please try again?</Modal.Body>
          <Modal.Footer>
            <Button 
              variant="primary" 
              onClick={()=>{
                this.shouldShowErrorCodeMessage=false;
                var a = ReactDOM.findDOMNode(this.codeInput) as HTMLElement;
                setTimeout(()=>a.focus(), 300);
              }}
            >
              Ok, sure!
            </Button>
          </Modal.Footer>
        </Modal>
    )
  }

}


export default NewUserGreeting;
