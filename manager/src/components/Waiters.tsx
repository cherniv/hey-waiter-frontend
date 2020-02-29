import React from 'react';
import { Figure, Button, Dropdown, ButtonToolbar, FormControl, Modal } from 'react-bootstrap';
import Waiter from '../models/Waiter';
import Business from '../models/Business';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import WaiterImg from '../images/waiter-icon.png'
import { trek } from '../utils/trek_manager';

type props = {
  business: any,
  editing: boolean,
  bigIcons: boolean,
}

@observer
class Waiters extends React.Component<props> {
  @observable shouldShowGenerateNewCodePrompt:boolean = false;
  waiterToDelete:Waiter = null;

  static defaultProps = {
    editing: true,
    bigIcons: true,
  }

  render() {
    const {
      business,
      editing,
      bigIcons,
    } = this.props;
    
    return (
      <>
      <ButtonToolbar>
        {business.waiters.map((waiter:Waiter, index:number)=>
          <WaiterComponent 
            waiter={waiter} 
            key={waiter.id} 
            editing={editing}
            index={index+1}
            bigIcon={bigIcons}
            getNewCodeOnPress={(waiter:Waiter)=>{
              this.shouldShowGenerateNewCodePrompt = true;
              this.waiterToDelete = waiter;
            }}
          />
        )}
        {editing &&
        <Button variant="primary" size="lg" 
          onClick={async () => {
            var w = await Business.current.addWaiter();
            trek({as:`mng`, mng:Business.current.id, wtr:w.id, act:`+waiter`});
          }}
        >+ <br />Add Waiter</Button>
        }
      </ButtonToolbar>
      {this.renderErrorPopup()}
      </>
    )
  }

  renderErrorPopup() {
    return (
      <Modal
        show={this.shouldShowGenerateNewCodePrompt} 
        onHide={() => this.shouldShowGenerateNewCodePrompt = false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to disconnect current person as well?</Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={()=>{
              this.shouldShowGenerateNewCodePrompt=false;
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={()=>{
              this.waiterToDelete.generateCode();
              trek({as:`mng`, mng:Business.current.id, act:`new code and disconnect`, wtr:this.waiterToDelete.id});
              Business.current.removeWaiterUserFromUserIds(this.waiterToDelete);
              this.waiterToDelete.update({userId:''});
              this.shouldShowGenerateNewCodePrompt=false;
            }}
          >
            Yes
          </Button>
          <Button 
            variant="primary" 
            onClick={()=>{
              this.waiterToDelete.generateCode();
              trek({as:`mng`, mng:Business.current.id, act:`new code`, wtr:this.waiterToDelete.id});
              this.shouldShowGenerateNewCodePrompt=false;
            }}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

type tableProps = {
  waiter: Waiter,
  editing: boolean,
  index: number,
  getNewCodeOnPress: any,
  bigIcon: boolean,
}

@observer
class WaiterComponent extends React.Component<tableProps> {
  static defaultProps = {
    editing: true,
    bigIcon: true,
  }
  
  @observable tempValue:string = this.props.waiter.customName;

  removeWaiter(waiter:Waiter) {
    Business.current.removeWaiter(waiter);
    trek({as:`mng`, mng:Business.current.id, act:`-waiter`, wtr:waiter.id});
  }
  render() {
    const {
      waiter,
      editing,
      index,
      getNewCodeOnPress,
      bigIcon,
    } = this.props;
    const {
      id,
      isPending,
      code,
      customName,
    } = waiter;
    return (
      <Dropdown 
        className="waiter-thumb-wrapper" 
      >
        <Dropdown.Toggle  
          id={"dropdown-basic"+id}
          variant={"outline-light"}
        >
          <Figure
            className={"waiter-thumb " + ((bigIcon) ? " waiter-thumb-big" : "") }
          >
            <Figure.Image
              alt={"Waiter " + id}
              src={WaiterImg}
              className={
                "waiter " + 
                (!editing && 
                  (isPending ? "waiter-passive" : "waiter-active")
                )
              }
            />
            {editing && 
              <FormControl
                size='sm'
                placeholder={"Name"}
                onBlur={()=>waiter.update({customName: this.tempValue})}
                value={this.tempValue}
                aria-label="Set name"
                aria-describedby="basic-addon2"
                onChange={({target}:any) => this.tempValue = target.value}
              />
            }
            {editing && 
              <FormControl
                size='sm'
                placeholder={"Loading..."}
                readOnly
                value={code}
                aria-label="Code"
                aria-describedby="basic-addon1"
              />
            }
            {!editing &&
            <Figure.Caption >
              {customName || index}
            </Figure.Caption>
            }
          </Figure>
        </Dropdown.Toggle>

        {editing &&
        <Dropdown.Menu>
          <Dropdown.Item 
            onSelect={()=>getNewCodeOnPress(waiter)}
          >Get new code</Dropdown.Item>
          <Dropdown.Item 
            onSelect={()=>this.removeWaiter(waiter)}
          >Remove waiter</Dropdown.Item>
        </Dropdown.Menu>
        }
        {!editing &&
        <Dropdown.Menu>
          <Dropdown.Item 
            disabled
            //onSelect={()=>alert("Coming soon")}
          >Coming soon</Dropdown.Item>
        </Dropdown.Menu>
        }
      </Dropdown>
      
    )
  }
}

export default Waiters;