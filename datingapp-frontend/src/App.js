import React, { Component } from 'react';
import './App.css';
import { logOut } from './util/apiFunctions';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Register from './components/register/Register';
import alertify from 'alertifyjs';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './components/login/login';
import MemberRouter from './components/member-router'
import Lists from './components/list/lists';
import Message from './components/message/message';
import MemberEdit from './components/member-edit'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { token: undefined, userId: undefined };
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

  setToken(token, id) {
    this.setState({ token: token, userId: id });
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
                  <NavDropdown.Item eventKey="4.1"><Link to={`/edit`}>Edit Profile</Link></NavDropdown.Item>
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
              <MemberRouter></MemberRouter>
            </Route>
            <Route path="/messages">
              <Message></Message>
            </Route>
            <Route path={`/edit`}>
              <MemberEdit userId={this.state.userId}></MemberEdit>
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
