import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import { fetchUser } from '../../store/actions/Login';
import './index.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            user: {
                email: '',
                password: ''
            }
        }
    }

    getRedirectionPath = () => {
        let query = new URLSearchParams(this.props.location.search);
        let redirectTo = query.get('redirectTo');
        return redirectTo;
    }

    toggleShowPassword = () => {
        this.setState({ hidden: !this.state.hidden })
    }

    setUserEmail = (event) => {
        this.setState({ user: { ...this.state.user, email: event.target.value } });
    }

    setUserPassword = (event) => {
        this.setState({ user: { ...this.state.user, password: event.target.value } });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.fetchUser(this.state.user);
    }

    render() {
        return (
            <>
                {this.props.loggedIn && <Redirect to={this.getRedirectionPath()} />}
                <div className='container-fluid GreyBg'>
                    <div classname='container'>
                        <div className='row'>
                            <div className='col-lg-4'></div>
                            <div className='col-lg-4 mt-4 mb-4 card border'>
                                <Form className='font-weight-bold' onSubmit={this.onSubmit}>
                                    <h3 className='font-weight-bolder text-center'>Sign In</h3>
                                    <p className='text-danger'>{this.props.loginError}</p>
                                    <div className="form-group">
                                        <label>Email address:</label>
                                        <FormControl type="text"
                                            placeholder="Email Address"
                                            className="mr-sm-2"
                                            type='email'
                                            value={this.state.user.email}
                                            onChange={this.setUserEmail} />
                                    </div>

                                    <div className="form-group">
                                        <label>Password:</label>
                                        <FormControl type="text"
                                            placeholder="Password"
                                            className="mr-sm-2"
                                            type={this.state.hidden ? 'password' : 'text'}
                                            value={this.state.user.password}
                                            onChange={this.setUserPassword} />
                                        <br />
                                        <Button variant='outline-primary btn-sm' onClick={this.toggleShowPassword}>{this.state.hidden ? 'show' : 'hide'}
                                            <svg width="2em" height="1em" viewBox="0 0 16 16" class="bi bi-cash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M15 4H1v8h14V4zM1 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H1z" />
                                                <path d="M13 4a2 2 0 0 0 2 2V4h-2zM3 4a2 2 0 0 1-2 2V4h2zm10 8a2 2 0 0 1 2-2v2h-2zM3 12a2 2 0 0 0-2-2v2h2zm7-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                                            </svg>
                                        </Button>
                                    </div>

                                    <Button variant="btn btn-primary btn-block mt-2 mb-3 btn-md" type='submit'>Login</Button>
                                    <p className="forgot-password text-right">
                                        Not Registered? <NavLink to='/register'>SignUp</NavLink>
                                    </p>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchUser
    }, dispatch);
}

const mapstateToProps = state => {
    const { loggedIn, user, loginError } = state.loginReducer;
    return {
        loggedIn,
        user,
        loginError
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Login);