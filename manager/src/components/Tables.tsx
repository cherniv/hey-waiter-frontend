import React from 'react';
import TableImg from "../images/dinner-table.png";
import { Figure, Button, Dropdown, ButtonToolbar } from 'react-bootstrap';
import Table from '../models/Table';
import Business from '../models/Business';
import { observer } from 'mobx-react';

type props = {
  business: any,
}

@observer
class Tables extends React.Component<props> {
  static defaultProps = {

  }

  render() {
    const {
      business,
    } = this.props;
    
    return (
      <ButtonToolbar>
        {business.tables.map((table:Table)=>
          <TableComponent table={table} />
        )}
        <Button variant="primary" size="lg" 
          onClick={() => {
            Business.current.addTable();
          }}
        >+ <br />Add Table</Button>
      </ButtonToolbar>
    )
  }
}

type tableProps = {
  table: Table,
}

class TableComponent extends React.Component<tableProps> {
  static defaultProps = {
    
  }
  removeTable(table:Table) {
    table.destroy();
  }
  render() {
    const {
      table,
    } = this.props;
    const {
      id,
    } = table;
    return (
      <Dropdown 
        key={id} 
        className="table-thumb-wrapper" 
      >
        <Dropdown.Toggle  id={"dropdown-basic"+id}>
          <Figure
            className="table-thumb"
          >
            <Figure.Image
              alt={"Table " + id}
              src={TableImg}
            />
          </Figure>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item 
            onSelect={()=>this.removeTable(table)}
          >Remove table</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
    )
  }
}

export default Tables;