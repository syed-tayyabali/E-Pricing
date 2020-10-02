import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkLogin } from '../../store/actions/Login';

class ProtectedRoute extends Component {
    constructor(props) {
        super(props);
        this.props.checkLogin();
    }

    render() {
        const Component = this.props.component;
        const isAuthenticated = this.props.loggedIn;
        return isAuthenticated ? (
            <Component />
        ) : <Redirect to='/login' />
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        checkLogin
    }, dispatch)
}

const mapStateToProps = state => {
    const { loggedIn, user } = state.loginReducer;
    return {
        loggedIn,
        user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);