import React, { Component } from 'react';
import { login } from '../util/APIUtils';
import './Login.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../constants';

import { Form, Button} from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                value: ''
            },
            password: {
                value: ''
            },
            error:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault(); 
        
        
        const loginRequest = {
            username: this.state.username.value,
            password: this.state.password.value
        };
        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            this.props.onLogin();
        }).catch(error => {
            if(error.status === 401) {
                this.setState({error:"Invalid username or password, Please try with valid credentials"})
            } else {
                this.setState({error:"Failed to Login, Please try again"})
            }
        });
       
    }

    
    validateUsername = (username) => {
        if(username.length == 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter Username'
            }
        }  else {
            return {
                isValid: null,
                errorMsg: null
            }
        }
    }

    
    validatePassword = (password) => {
        if(password.length == 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter password.'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null,
            };            
        }
    }

    
    render() {
        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">
                <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Group className="mb-3" controlId="signup-form.username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Username" isValid={this.state.username.isValid}
                            autoComplete="off" value={this.state.username.value} onBlur={this.validateUsernameAvailability}
                            onChange={(event) => this.handleInputChange(event, this.validateUsername)} />
                            <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="signup-form.password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" isValid={this.state.password.isValid}
                            autoComplete="off" value={this.state.password.value}
                            onChange={(event) => this.handleInputChange(event, this.validatePassword)} />
                            <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group  className="mb-3" controlId="signup-form.password">
                            <Form.Label >{this.state.error}</Form.Label>
                        </Form.Group>
                <Form.Group>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                    Or <Link to="/signup">register now!</Link>
                </Form.Group>
            </Form>
                </div>
            </div>
        );
    }
}

export default Login;