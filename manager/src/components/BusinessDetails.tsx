import * as React from 'react';
import {
  Form,
} from 'react-bootstrap';
import { observer } from 'mobx-react';

type props = {
  business: any,
  showTitle: boolean,
  autoSave: boolean,
}

@observer
class BusinessDetails extends React.Component<props> {

  static defaultProps = {
    showTitle: true,
    autoSave: true,
  }

  render() {
    const {
      business,
      showTitle,
      autoSave,
    } = this.props;
    return (
      <Form>
        <Form.Group controlId="formGroupEmail">
          {showTitle && <Form.Label>Restaurant Title</Form.Label>}
          <Form.Control
            type="name" placeholder="Type title here..."
            onChange={({target}: any) => {
              business.title = target.value;
              autoSave && business.save();
            }}
            value={business.title}
          />
        </Form.Group>
        <Form.Group controlId="formGroupInsta">
          {showTitle && <Form.Label>Restaurant Instagram</Form.Label>}
          <Form.Control
            type="name" placeholder="Type instagram here..."
            onChange={({target}: any) => {
            }}
          />
        </Form.Group>
      </Form>
    )
  }
}

export default BusinessDetails;