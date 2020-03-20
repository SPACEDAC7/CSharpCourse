import React, { Component } from 'react';
import { Form, FormControl, Button, InputGroup} from 'react-bootstrap';
import { register } from '../../util/apiFunctions'
import './Register.css';
import alertify from 'alertifyjs';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: "", 
      password: "",
      confirmPassword: "",
      gender: "",
      knownAs: "",
      dateOfBirth: "",
      city: "",
      country: "",
    }
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

  handleConfimePasswordChange(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  handleGenderChange(event) {
    this.setState({ gender: event.target.value });
  }

  handleKnownAsChange(event) {
    this.setState({ knownAs: event.target.value });
  }

  handleDateOfBirthChange(date) {
    this.setState({ dateOfBirth: date });
  }

  handleCityChange(event) {
    this.setState({ city: event.target.value });
  }

  handleCountryChange(event) {
    this.setState({ country: event.target.value });
  }

  doRegister() {
    if(this.state.password === this.state.confirmPassword){
      register(this.state.username, this.state.password, this.state.gender, this.state.knownAs, this.state.dateOfBirth, this.state.city, this.state.country).then(registerResponse => {
        if(registerResponse===true){
          alertify.success("Usuario registrado correctamente");
        }else{
          alertify.error("No se ha podido realizar el registro");
        }
      });
    } else {
      alertify.error("Password no coincide");
    }
    
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

      <InputGroup className="mb-3" value={this.state.knownAs}
          onChange={(event) => this.handleKnownAsChange(event)}>
        <FormControl
          placeholder="KnownAs"
          aria-label="KnownAs"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Control as="select" onChange={(event)=>{this.handleGenderChange(event)}}>
          <option disabled selected>Por que genero te defines:</option>
          <option>Male</option>
          <option>Female</option>
          <option>Trans</option>
          <option>Other</option>
        </Form.Control>
      </Form.Group>

      <div className="mb-3 input-group">
        <DatePicker
          selected={this.state.dateOfBirth}
          className="form-control"
          placeholderText={"Date of Birth"}
          onChange={(date) => this.handleDateOfBirthChange(date)}
        />
      </div>

      <InputGroup className="mb-3" value={this.state.city}
          onChange={(event) => this.handleCityChange(event)}>
        <FormControl
          placeholder="City"
          aria-label="City"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <InputGroup className="mb-3" value={this.state.country}
          onChange={(event) => this.handleCountryChange(event)}>
        <FormControl
          placeholder="Country"
          aria-label="Country"
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

      <InputGroup className="mb-3" value={this.state.password}
          onChange={(event) => this.handleConfimePasswordChange(event)}>
        <FormControl
          placeholder="Confirm Password"
          aria-label="Confirm Password"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      
      <Button type='button'
          variant="outline-success" onClick={() => this.doRegister()} >Register</Button>
    </div>
  }
}

export default Register;