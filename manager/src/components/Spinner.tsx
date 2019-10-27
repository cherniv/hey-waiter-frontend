import React from 'react';
import "../../src/spinner.css"

const Spinner: React.FC = () => {
  return (
    <div className="lds-roller spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  )
}

export default Spinner;