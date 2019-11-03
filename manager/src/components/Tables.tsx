import React from 'react';
import TableImg from "../images/dinner-table.png";
import CallingImg from "../images/greeting-man.png";
import { Figure, Button, Dropdown, ButtonToolbar, FormControl } from 'react-bootstrap';
import Table from '../models/Table';
import Business from '../models/Business';
import { observer } from 'mobx-react';

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
        {business.tables.map((table:Table, index:number)=>
          <TableComponent 
            table={table} 
            key={table.id} 
            editing={editing}
            index={index+1}
          />
        )}
        {editing &&
        <Button variant="primary" size="lg" 
          onClick={() => {
            Business.current.addTable();
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
  index: number,
}

@observer
class TableComponent extends React.Component<tableProps> {
  static defaultProps = {
    editing: true,
    
  }
  removeTable(table:Table) {
    table.destroy();
  }
  render() {
    const {
      table,
      editing,
      index,
    } = this.props;
    const {
      id,
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
            <Figure.Caption>
              {customName || index}
            </Figure.Caption>
          </Figure>
        </Dropdown.Toggle>

        {editing &&
        <Dropdown.Menu>
          <Dropdown.Item 
            
          >
            <FormControl
              autoFocus
              value={customName}
              placeholder="Set name"
              aria-label="Set name"
              aria-describedby="basic-addon1"
              onChange={({target}:any) => table.update({customName: target.value})}
            />
          </Dropdown.Item>
          <Dropdown.Divider />
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
  }

  resetTable (table:Table) {
    table.update({
      isActive: false,
      isCalling: false,
    })
  }
}

export default Tables;