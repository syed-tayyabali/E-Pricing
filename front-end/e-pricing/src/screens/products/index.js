import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getProducts } from '../../store/actions/Products';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({ id: this.props.match.params.id })
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.id}</h2>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getProducts
    }, dispatch)
}

const mapStateToProps = state => {
    const { products, loading } = state.Products;
    return {
        products,
        loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);