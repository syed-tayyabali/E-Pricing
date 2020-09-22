import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import './index.css'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            }
        }
    }

    setUserFirstName = (event) => {
        this.setState({ user: { ...this.state.user, firstName: event.target.value } });
    }
    setUserLastName = (event) => {
        this.setState({ user: { ...this.state.user, lastName: event.target.value } });
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
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-4'></div>
                        <div className='col-lg-4 mt-4 mb-4 card border'>
                            <Form className='font-weight-bold' onSubmit={this.onSubmit}>
                                <h3 className='font-weight-bolder text-center'>Sign Up</h3>

                                <div className="form-group">
                                    <label>First Name:</label>
                                    <FormControl type="text"
                                        placeholder="First Name"
                                        className="mr-sm-2"
                                        value={this.state.user.firstName}
                                        onChange />
                                </div>

                                <div className="form-group">
                                    <label>Last Name:</label>
                                    <FormControl type="text"
                                        placeholder="Last Name"
                                        className="mr-sm-2" />
                                </div>

                                <div className="form-group">
                                    <label>Email address:</label>
                                    <FormControl type="text"
                                        placeholder="Enter Email"
                                        className="mr-sm-2" />
                                </div>

                                <div className="form-group">
                                    <label>Password:</label>
                                    <FormControl type="text"
                                        placeholder="password"
                                        className="mr-sm-2" />
                                </div>

                                <Button variant="btn btn-primary btn-block mt-2 mb-3 btn-md" type='submit'>Login</Button>
                                <p className="forgot-password text-right">
                                    Already registered <NavLink to='/login'>SignIn</NavLink>
                                </p>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register; 