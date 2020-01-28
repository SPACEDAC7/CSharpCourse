import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = { username: "", password: "" }
    }
  
    handleUsernameChange(event) {
      this.setState({ username: event.target.value });
    }
  
    handlePasswordChange(event) {
      this.setState({ password: event.target.value });
    }
    
    register() {
        console.log("Registrarmosse");
    }

    render(){
        return <div>
            <Form inline onSubmit={() => this.register()}>
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
                  variant="outline-success" >Register</Button>
              </Form>
        </div>  
    }
}

export default Register;