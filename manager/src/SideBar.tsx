import React from 'react';

import {
  Link
} from "react-router-dom";

import SidebarLogo from './images/sidebar-logo.png';

const SideBar: React.FC = () => {
  return (
    <div className="sidebar" >
      <img src={SidebarLogo} className="sidebar-logo" alt="Logo" />
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/bubblegum">Bubblegum</Link>
        </li>
        <li>
          <Link to="/shoelaces">Shoelaces</Link>
        </li>
      </ul>

    </div>
  )
}

export default SideBar;