import React, { Component } from 'react';
import { Form, FormControl, Button, InputGroup} from 'react-bootstrap';
import { register } from '../util/apiFunctions'
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" }
  }

  componentDidUpdate() {
    console.log("The component has been updated")
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  doRegister() {
    register(this.state.username, this.state.password);
  }

  render() {
    return <div className="espaciado">
      <h1>Registration Form</h1>
      <InputGroup className="mb-3" value={this.state.username}
          onChange={(event) => this.handleUsernameChange(event)}>
        <FormControl
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <InputGroup className="mb-3" value={this.state.password}
          onChange={(event) => this.handlePasswordChange(event)}>
        <FormControl
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <Button type='button'
          variant="outline-success" onClick={() => this.doRegister()} >Register</Button>
    </div>
  }
}

export default Register;