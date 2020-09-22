import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import { fetchUser } from '../../store/actions/Login';
import './index.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: ''
            }
        }
    }

    setUserEmail = (event) => {
        this.setState({ user: { ...this.state.user, email: event.target.value } });
    }

    setUserPassword = (event) => {
        this.setState({ user: { ...this.state.user, password: event.target.value } });
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.user);
        this.props.fetchUser(this.state.user);
    }

    render() {
        return (
            <div className='container-fluid GreyBg'>
                <div classname='container'>
                    <div className='row'>
                        <div className='col-lg-4'></div>
                        <div className='col-lg-4 mt-4 mb-4 card border'>
                            <Form className='font-weight-bold' onSubmit={this.onSubmit}>
                                <h3 className='font-weight-bolder text-center'>Sign In</h3>

                                <div className="form-group">
                                    <label>Email address:</label>
                                    <FormControl type="text"
                                        placeholder="Email Address"
                                        className="mr-sm-2"
                                        value={this.state.user.email}
                                        onChange={this.setUserEmail} />
                                </div>

                                <div className="form-group">
                                    <label>Password:</label>
                                    <FormControl type="text"
                                        placeholder="Password"
                                        className="mr-sm-2"
                                        value={this.state.user.password}
                                        onChange={this.setUserPassword} />
                                </div>

                                <Button variant="btn btn-primary btn-block mt-2 mb-3 btn-md" type='submit'>Login</Button>
                                <p className="forgot-password text-right">
                                    Not Registered? <NavLink to='/register'>SignUp</NavLink>
                                </p>
                                <p className="forgot-password text-right">
                                    Forgot <a href="#">password?</a>
                                </p>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchUser
    }, dispatch);
}

const mapstateToProps = state => {
    const { loggedIn, user } = state.loginReducer;
    return {
        loggedIn,
        user
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Login);