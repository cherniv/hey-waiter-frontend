import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {ROUTES} from './config';
import SideBar from './SideBar';
import "./config/firebase";
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import Auth from './services/Auth';
import SignIn from './components/SignIn';
import Spinner from './components/Spinner';

@observer
class App extends React.Component {
  @observable ready = false;
  async componentDidMount() {
    
    await Auth.init();

    this.ready = true;
  }
  render() {
    if (!this.ready) return null;
    if (Auth.authStateLoading) {
      return (
        <Spinner />
      );
    }
    if (!Auth.isLoggedIn) {
      return (
        <SignIn />
      );
    }
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
}

export default App;
