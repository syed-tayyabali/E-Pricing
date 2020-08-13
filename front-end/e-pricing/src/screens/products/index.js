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
            this.setState({ id: this.props.match.params.id }, () => {
                this.props.getProducts(this.state.id)
            })
        }
    }

    componentDidMount() {
        this.props.getProducts(this.state.id)
        console.log(this.props);
    }

    render() {
        return (
            <div>
                {this.props.products.map((product) => (
                    <div>
                        <h5>{product.heading}</h5>
                        <h5>{product.price}</h5>
                        <img src={`${product.productLargeImg}`}></img>
                    </div>
                ))}
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
    const { products, loading } = state.products;
    return {
        products,
        loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);