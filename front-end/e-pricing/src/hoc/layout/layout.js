import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, withRouter } from 'react-router-dom';
import Aux from '../Auxilliary/Auxilliary';
import './layout.css';

const DISPLAY_NONE_CLASS= 'display-none';
const DISPLAY_CLASS= 'display-show';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownToggle: false,
        };
    }

    toggleDropDownClass = () => {
        this.setState({dropDownToggle: !this.state.dropDownToggle});
    }

    render() {
        let dropDownClass = 'dropdown-menu';
        let displayClass = this.state.dropDownToggle ? DISPLAY_CLASS : DISPLAY_NONE_CLASS;
        dropDownClass = dropDownClass + ' ' + displayClass;
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
                        <li class="nav-item dropdown">
                            <a onClick={this.toggleDropDownClass} className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div class={dropDownClass} aria-labelledby="navbarDropdown">
                                <NavLink to="/laptop" className="dropdown-item text-dark">Laptops</NavLink>
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

export default withRouter(Layout);