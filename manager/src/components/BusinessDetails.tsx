import * as React from 'react';
import {
  Form,
} from 'react-bootstrap';
import { observer } from 'mobx-react';

type props = {
  business: any,
  showTitle: boolean,
}

@observer
class BusinessDetails extends React.Component<props> {

  static defaultProps = {
    showTitle: true,
  }

  render() {
    const {
      business,
      showTitle,
    } = this.props;
    return (
      <Form>
        <Form.Group controlId="formGroupEmail">
          {showTitle && <Form.Label>Business Title</Form.Label>}
          <Form.Control 
            type="name" placeholder="Type name here..." 
            onChange={({target}: any) => business.title = target.value}
            value={business.title}
          />
        </Form.Group>
      </Form>
    )
  }
}

export default BusinessDetails;