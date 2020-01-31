import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { logIn, logOut, isLoggedIn } from './util/apiFunctions';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import Register from './components/Register';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", values: [], token: "" }
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }


  doCall() {
    this.setState({ token: logIn(this.state.username, this.state.password) });
    console.log(this.state);
  }

  doLogOut() {
    logOut();
    this.setState({token: ''});
  }

  render() {
    return (
      <div className="App">

        <Navbar bg="dark" variant='dark' expand="lg">
          <Navbar.Brand href="#home">Dating App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Values</Nav.Link>
              <Nav.Link href="#link">Messages</Nav.Link>
            </Nav>
            {this.state.token == '' ?
              (<Form inline>
                <FormControl
                  type="text"
                  value={this.state.username}
                  onChange={(event) => this.handleUsernameChange(event)}
                  placeholder="Username"
                  className="mr-sm-2" />
                <FormControl
                  type="password"
                  value={this.state.password}
                  onChange={(event) => this.handlePasswordChange(event)}
                  placeholder="Password"
                  className="mr-sm-2" />
                <Button type='button'
                  variant="outline-success" onClick={() => this.doCall()} >Login</Button>
              </Form>) :
              (<NavDropdown title="Hello User" id="nav-dropdown">
                <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.4" onClick={() => this.doLogOut()}>Log Out</NavDropdown.Item>
              </NavDropdown>)
            }

          </Navbar.Collapse>
        </Navbar>
        <Register></Register>
        <button onClick={() => this.doCall()}>Press here</button>
        <hr></hr>
        {this.state.values.map(x => {
          return (<button key={x.id}>{x.name}</button>);
        })}
      </div>
    );
  }
}

export default App;
