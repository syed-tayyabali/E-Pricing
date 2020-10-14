import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

import { getProducts } from '../../store/actions/Products';
import './index.css';

class Laptop extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getProducts(25);
    }

    productImg = (product) => {
        let productImg = <img src={`${product.productSmallImg}`} className='card-img-top mt-3 mb-3'></img>;
        if (!product.productSmallImg) {
            productImg = <img src={`${product.productLargeImg}`} className='card-img-top mt-3 mb-3' height='200' width='150'></img>;
        }
        return productImg
    }


    render() {
        return (
            <div className='container  bg-light rounded mb-4'>
                <h3 className='text-black-50'>LAPTOPS</h3>
                <div className="span11">
                    <div class="row-fluid">
                        {this.props.products.map((product) => (
                            <NavLink to={`/product/${product._id}`} className='col-lg-2 rounded m-3 card'>
                                {this.productImg(product)}
                                <h6 className='text-black-50 inbox'>{product.heading}</h6>
                                <h4 className='btn btn-primary'>{product.price}</h4>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getProducts,
    }, dispatch)
}

const mapStateToProps = state => {
    const { products, loading, categories, countProduct } = state.products
    return {
        products,
        loading,
        categories,
        countProduct
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Laptop);