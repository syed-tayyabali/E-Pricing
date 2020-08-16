import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

import { getProducts } from '../../store/actions/Products';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            loading: false
        };
    }

    componentDidUpdate(prevProps) {
        const { loading } = prevProps;
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({ id: this.props.match.params.id }, () => {
                this.props.getProducts(this.state.id)
            })
        }
        if (loading !== this.props.loading) {
            this.setState({ loading: this.props.loading });
        }
    }

    componentDidMount() {
        this.props.getProducts(this.state.id)
        console.log(this.props);
    }

    render() {
        return (
            <div>
                {this.props.products.map((products) => (
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <NavLink to={`/product/${products._id}`}>
                                    <h5>{products.heading}</h5>
                                    <h5>{products.price}</h5>
                                    {/* <img src={`${product.productLargeImg}`}></img> */}
                                </NavLink>
                            </div>
                        </div>
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