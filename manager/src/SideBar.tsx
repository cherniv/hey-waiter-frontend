import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import SidebarLogo from './images/sidebar-logo.png';

const SideBar: React.FC = () => {
  return (
    <div className="sidebar" >
      <img src={SidebarLogo} className="sidebar-logo" />
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