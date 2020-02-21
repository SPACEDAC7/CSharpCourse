import React, { Component } from 'react';
import { logIn } from '../../util/apiFunctions';
import { Form, FormControl, Button } from 'react-bootstrap';
import alertify from 'alertifyjs';

class Login extends Component {

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
        logIn(this.state.username, this.state.password).then(res => {
            console.log("Respuesta del login: ", res);
            if (res.errorCode !== undefined) {
                alertify.error("There is an error");
            } else {
                alertify.success("Nos hemos podido loggear");
                this.setState({ token: logIn(this.state.username, this.state.password) });
                this.props.setToken(res.token, res.id);


                console.log(this.state);
            }
        });
    }

    render() {
        return (<div>
            <Form inline>
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
            </Form>
        </div>)
    }

}

export default Login;