import React, { Component } from 'react';
import './App.css';
import { isLoggedIn, logOut } from './util/apiFunctions';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Register from './components/register/Register';
import alertify from 'alertifyjs';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './components/login/login';
import Member from './components/members/members';
import Lists from './components/list/lists';
import Message from './components/message/message';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { token: undefined };
    this.setToken = this.setToken.bind(this)
  }

  componentDidUpdate() {
    console.log("--This is the app--");
  }

  doLogOut() {
    logOut();
    this.setState({ token: undefined });
    alertify.message("Logged out");
  }

  setToken(token) {
    this.setState({ token: token });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar bg="dark" variant='dark' expand="lg">
            <Navbar.Brand>
              <Link to="/">Dating App</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {!this.state.token ?
                (<div className="centered">
                  <Login setToken={this.setToken}></Login>
                </div>) :
                (<div><Nav className="mr-auto">
                  <Nav.Link><Link to="/members">Matches</Link></Nav.Link>
                  <Nav.Link><Link to="/list">List</Link></Nav.Link>
                  <Nav.Link><Link to="/messages">Messages</Link></Nav.Link>
                </Nav>
                  <NavDropdown title="Hello User" id="nav-dropdown">
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="4.4" onClick={() => this.doLogOut()}>Log Out</NavDropdown.Item>
                  </NavDropdown></div>)
              }

            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/lists">
              <Lists></Lists>
            </Route>
            <Route path="/members">
              <Member></Member>
            </Route>
            <Route path="/messages">
              <Message></Message>
            </Route>
            <Route path="/">
              <Register></Register>
            </Route>
          </Switch>

        </Router>
      </div>
    );
  }
}

export default App;
