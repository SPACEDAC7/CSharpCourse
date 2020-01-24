import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getValues } from './util/apiFunctions';
import { Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { values: [] }
  }

  componentDidMount() {
    this.doCall()
  }


  doCall() {
    getValues();
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
            <Form inline>
              <FormControl type="text" placeholder="Username" className="mr-sm-2" />
              <FormControl type="text" placeholder="Password" className="mr-sm-2" />
              <Button variant="outline-success">Login</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>


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
