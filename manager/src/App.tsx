import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {ROUTES} from './config';
import SideBar from './SideBar';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <SideBar />
        <div className="main-stage">
          <Switch>
            {ROUTES.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
