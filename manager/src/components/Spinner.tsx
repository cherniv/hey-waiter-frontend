import React from 'react';
import {Spinner} from 'react-bootstrap'

const Spinr: React.FC = () => {
  return (
    <Spinner animation="border" role="status" variant="danger" >
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}

export default Spinr;