import React, { Component } from 'react';

import Mobile from './Mobile';
import Laptop from './Laptop';
import './index.css';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='p-3'>
                    <Laptop />
                    <Mobile />
                </div>
            </div>
        );
    }
}


export default Home;