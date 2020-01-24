import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './util/apiFunctions';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", values: [], token: "" }
  }

  /* componentDidMount() {
    this.doCall()
  } */

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }


  doCall() {
    console.log('We are login with ', this.state);
    this.setState({ token : Login(this.state.username, this.state.password)});
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
            <Form inline onSubmit={() => this.doCall()}>
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
              <Button type='submit'
                variant="outline-success" >Login</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <div>
          Token: {this.state.token}
        </div>

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
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
