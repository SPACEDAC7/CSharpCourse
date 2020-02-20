import React, { Component } from 'react';
import { FormControl, Button, InputGroup} from 'react-bootstrap';
import { register } from '../../util/apiFunctions'
import './Register.css';
import alertify from 'alertifyjs';

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
    register(this.state.username, this.state.password).then(registerResponse => {
      if(registerResponse===true){
        alertify.success("Usuario registrado correctamente");
      }else{
        alertify.error("No se ha podido realizar el registro");
      }
    });
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