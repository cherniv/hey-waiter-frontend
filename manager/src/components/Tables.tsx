import React from 'react';
import TableImg from "../images/dinner-table.png";
import CallingImg from "../images/greeting-man.png";
import { Figure, Button, Dropdown, ButtonToolbar, FormControl } from 'react-bootstrap';
import Table from '../models/Table';
import Business from '../models/Business';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { trek } from '../utils/trek_manager';

type props = {
  business: any,
  editing: boolean
}

@observer
class Tables extends React.Component<props> {
  static defaultProps = {
    editing: true,
  }

  render() {
    const {
      business,
      editing,
    } = this.props;
    
    return (
      <ButtonToolbar>
        {business.tables.map((table:Table)=>
          <TableComponent 
            table={table} 
            key={table.id} 
            editing={editing}
          />
        )}
        {editing &&
        <Button variant="primary" size="lg" 
          onClick={() => {
            Business.current.addTable();
            trek({as:`mng`, mng:Business.current.id, act:`+table`});
          }}
        >+ <br />Add Table</Button>
        }
      </ButtonToolbar>
    )
  }
}

type tableProps = {
  table: Table,
  editing: boolean,
}

@observer
class TableComponent extends React.Component<tableProps> {
  static defaultProps = {
    editing: true,
    
  }
 
  @observable tempValue:string = this.props.table.customName;

  removeTable(table:Table) {
    table.destroy();
    trek({as:`mng`, mng:Business.current.id, act:`-table`});
  }
  render() {
    const {
      table,
      editing,
    } = this.props;
    const {
      id,
      index,
      isActive,
      isCalling,
      customName,
    } = table;
    return (
      <Dropdown 
        className="table-thumb-wrapper" 
      >
        <Dropdown.Toggle  
          id={"dropdown-basic"+id}
          variant={isActive ? "outline-secondary" : "outline-light"}
        >
          <Figure
            className="table-thumb"
          >
            <Figure.Image
              alt={"Table " + id}
              src={isCalling ? CallingImg : TableImg}
              className={!editing && !isActive && "table-passive"}
            />
            {editing && 
              <FormControl
                placeholder={""+index}
                onBlur={()=>table.update({customName: this.tempValue})}
                value={this.tempValue}
                aria-label="Set name"
                aria-describedby="basic-addon1"
                onChange={({target}:any) => this.tempValue = target.value}
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
            onSelect={()=>this.removeTable(table)}
          >Remove table</Dropdown.Item>
        </Dropdown.Menu>
        }
        {!editing &&
        <Dropdown.Menu>
          {isActive &&
          <Dropdown.Item 
            onSelect={()=>this.resetTable(table)}
          >Reset</Dropdown.Item>
          }
          {!isActive &&
          <Dropdown.Item 
            onSelect={()=>this.setTableAsCalling(table)}
          >Set as "Calling"</Dropdown.Item>
          }
        </Dropdown.Menu>
        }
      </Dropdown>
      
    )
  }

  setTableAsCalling (table:Table) {
    table.update({
      isActive: true,
      isCalling: true,
    })
    trek({act:"call", tbl:table.id, as:`mng`, mng:Business.current.id});
  }

  resetTable (table:Table) {
    table.update({
      isActive: false,
      isCalling: false,
    })
    trek({act:"reset", tbl:table.id, as:`mng`, mng:Business.current.id});
  }
}

export default Tables;