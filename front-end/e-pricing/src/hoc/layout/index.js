import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { NavLink, withRouter } from 'react-router-dom';

import Aux from '../Auxilliary/Auxilliary';
import './layout.css';
import { getCategories } from '../../store/actions/Category';


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
                    <Navbar.Brand href="/home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavLink
                            exact
                            className="nav-link"
                            activeClassName="nav-link active"
                            to="/"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            exact
                            className="nav-link"
                            activeClassName="nav-link active"
                            to="/category"
                        >
                            category
                        </NavLink>
                        <li className="nav-item dropdown">
                            <a onClick={this.toggleDropDownClass} className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className={dropDownClass} aria-labelledby="navbarDropdown">
                                {this.props.categories.map((category, index) => (
                                    <NavLink to={`/products/${category._id}`} className="dropdown-item text-dark">{category.name}</NavLink>
                                ))}
                            </div>
                        </li>
                    </Nav>

                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
                <main>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getCategories,
    }, dispatch)
}

const mapStateToProps = state => {
    const { categories, loading } = state.category;
    return {
        categories,
        loading,
    }
}

connect(null, mapDispatchToProps)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));