import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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

import {
  Container, 
  Row, 
  Col,
} from 'react-bootstrap';

import Initializer from './initializers'

@observer
class App extends React.Component {
  @observable ready = false;
  async componentDidMount() {
    
    await Initializer.init();

    this.ready = true;
  }
  
  render() {
    if (!this.ready) return <div />;
    
    return (
      <Router>
        {Auth.isLoggedIn && <SideBar />}
        <Container className="main-container">
          <Row className="fill">
            {this.renderContent()}
          </Row>
        </Container>
      </Router>
    );
  }

  renderContent() {
    var el;
    if (Auth.authStateLoading) {
      el = (
        <Col className="center">
          <Spinner />
        </Col>
      );
    } else if (!Auth.isLoggedIn) {
      el = (
        <Col className="center">
          <SignIn />
        </Col>
      );
    } else {
      el = (
        <Col>
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
        </Col>
      );
    }

    return el;
  }
}

export default App;
