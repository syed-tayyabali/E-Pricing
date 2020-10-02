import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, withRouter } from 'react-router-dom';

import Aux from '../Auxilliary/Auxilliary';
import './layout.css';
import { getCategories } from '../../store/actions/Category';
import facebook from '../../assets/facebook.png';
import twiter from '../../assets/twiter.png';
import instagram from '../../assets/insta.jpg';
import youtube from '../../assets/youtube.png';
import logo from '../../assets/logo.jpeg';
import { checkLogin, logOut } from '../../store/actions/Login';

const DISPLAY_NONE_CLASS = 'display-none';
const DISPLAY_CLASS = 'display-show';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownToggle: false,
            loading: false,
        };
    }

    componentDidUpdate(prevProps) {
        const { loading } = prevProps;
        if (loading !== this.props.loading) {
            this.setState({ loading: this.props.loading });
        }
    }

    componentDidMount() {
        this.props.getCategories();
    }

    toggleDropDownClass = () => {
        this.setState({ dropDownToggle: !this.state.dropDownToggle });
    }

    render() {
        let dropDownClass = 'dropdown-menu';
        let displayClass = this.state.dropDownToggle ? DISPLAY_CLASS : DISPLAY_NONE_CLASS;
        dropDownClass = dropDownClass + ' ' + displayClass;
        if (this.state.loading) {
            return null;
        }
        return (
            <Aux>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">
                        <img className='logo' src={logo}></img>
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavLink
                            exact
                            className="nav-link"
                            activeClassName="nav-link active"
                            to="/"
                        >
                            Home
                        </NavLink>
                        {/* <NavLink
                            exact
                            className="nav-link"
                            activeClassName="nav-link active"
                            to="/category"
                        >
                            category
                        </NavLink> */}
                        <li className="nav-item dropdown">
                            <a onClick={this.toggleDropDownClass} className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Category
                            </a>
                            <div className={dropDownClass} aria-labelledby="navbarDropdown">
                                {this.props.categories.map((category, index) => (
                                    <NavLink to={`/products/${category._id}`} className="dropdown-item text-dark font-italic">{category.name}</NavLink>
                                ))}
                            </div>
                        </li>
                    </Nav>
                    <Nav>
                        {this.props.loggedIn ? <NavLink
                            exact
                            className="nav-link"
                            activeClassName="nav-link active mr-1"
                            to='/wishList'
                        >
                            Wishlist
                        </NavLink> : null
                        }
                        {this.props.loggedIn ?
                            <NavLink
                                exact
                                className="nav-link"
                                activeClassName="nav-link active"
                                onClick={this.props.logOut}
                                to
                            >LOGOUT</NavLink> :
                            <NavLink
                                exact
                                className="nav-link"
                                activeClassName="nav-link active"
                                to={`/login?redirectTo=${window.location.pathname}`}
                            >LOGIN</NavLink>
                        }
                    </Nav>
                </Navbar>
                <main>
                    {this.props.children}
                </main>
                <footer className='bg-dark text-white font-italic'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-6 col-md-4'>
                                <div>
                                    <p className='mt-4'>Head Office,
                                        <br />
                                        Sir Syed University Of Engineering and Technology
                                    </p>
                                    <ul class="list-inline mt-2">
                                        <li class="m-0 pl-10 pr-10">
                                            UAN: 111-729-526 (+0092-213) 4130786-90
                                    </li>
                                        <li class="m-0 pl-10 pr-10">
                                            CELL: 92-311-1729526
                                    </li>
                                        <li class="m-0 pl-10 pr-10">
                                            USA NO +1(716)941 7792
                                    </li>
                                        <li class="m-0 pl-10 pr-10">
                                            UK NO (+44)115 970 6256
                                    </li>
                                        <li class="m-0 pl-10 pr-10">
                                            info@ssuet.com
                                    </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-sm-6 col-md-4'>
                                <h5 className="mt-4">
                                    Useful Links
                                    <hr className='bg-success' />
                                </h5>
                            </div>
                            <div className='col-sm-6 col-md-4 mt-4'>
                                <h5 className="mb-10">Connect With Us</h5>
                                <img className='imgTag' src={facebook}></img>
                                <img className='imgTag' src={twiter}></img>
                                <img className='imgTag' src={instagram}></img>
                                <img className='imgTag' src={youtube}></img>
                            </div>
                        </div>
                    </div>
                    <div className='footer-bottom bg-primary'>
                        <div className='container pt-50'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <p>Copyright © 2020 Sir Syed University of Engineering and Technology</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getCategories,
        checkLogin,
        logOut
    }, dispatch)
}

const mapStateToProps = state => {
    const { categories, loading } = state.category;
    const { loggedIn, user } = state.loginReducer
    return {
        categories,
        loading,
        loggedIn,
        user
    }
}

connect(null, mapDispatchToProps)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));