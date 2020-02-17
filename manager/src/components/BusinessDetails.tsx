import * as React from 'react';
import {
  Form,
} from 'react-bootstrap';
import { observer } from 'mobx-react';
import Business from '../models/Business';

type props = {
  business: Business,
  showTitle: boolean,
  autoSave: boolean,
  showInstagram: boolean,
}

@observer
class BusinessDetails extends React.Component<props> {

  static defaultProps = {
    showTitle: true,
    autoSave: true,
    showInstagram: false,
  }

  render() {
    const {
      business,
      showTitle,
      autoSave,
      showInstagram,
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
        {showInstagram &&
        <Form.Group controlId="formGroupInsta">
          <Form.Label>Restaurant Instagram</Form.Label>
          <Form.Control
            type="name" placeholder="Type instagram here..."
            onChange={({target}: any) => {
                business.instagram = target.value;
                autoSave && business.save();
            }}
          />
        </Form.Group>
        }
      </Form>
    )
  }
}

export default BusinessDetails;