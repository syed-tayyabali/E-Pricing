import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import parse from 'html-react-parser';
import Button from 'react-bootstrap/Button';

import { getProductDetail } from '../../store/actions/productDetail';
import { postUserWishlist } from '../../store/actions/WishList';
import './index.css';
import { NavLink, Redirect } from 'react-router-dom';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            loading: false
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({ id: this.props.match.params.id }, () => {
                this.props.getProductDetail(this.state.id);
            })
        }
    }

    componentDidMount() {
        this.props.getProductDetail(this.state.id)
    }

    arrayDescription = () => {
        if (!this.props.product.description) {
            return null;
        }
        let description = this.props.product.description.map((describe, index) => {
            return parse(describe)
        });
        return description;
    }

    productImg = () => {
        let productImg = this.props.product.productLargeImg;
        if (!productImg) {
            productImg = this.props.product.productSmallImg;
        }
        return productImg
    }

    checkLogin = () => {
        if (this.props.loggedIn) {
            return '/wishList';
        } else {
            return '/login';
        }
    }

    submitWishlist = () => {
        const wishlist = {
            userId: this.props.user._id,
            productId: this.state.id,
            quantity: 1
        }
        this.props.postUserWishlist(this.props.user._id, wishlist);
    }


    render() {
        console.log('product detail: user id', this.props.user._id);
        if (this.props.loading) {
            return null;
        }

        return (
            < div className='container-fluid ' >
                <div className='row GreyBg'>
                    <div className='row mt-3 mr-5 ml-5 mb-3 bg-white rounded'>
                        <div className='col-lg-12'>
                            <h3 className='m-3'>{this.props.product.heading}</h3>
                            <hr />
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <img className='ml-5' src={`${this.productImg()}`} width='60%'></img>
                        </div>
                        <div className='col-lg-8 mt-5'>
                            <h3 className='text-black-50 font-italic'>Rs. {this.props.product.price}</h3>
                            <br />
                            <br />
                            <div className='row'>
                                <NavLink className='col-lg-5 btn btn-secondary '
                                    to={`/productComaparison?type=${this.props.product.type}&seller_keyId=${this.props.product.seller_keyID}&heading=${this.props.product.heading}&id=${this.props.product._id}`}>
                                    Compair Product
                                </NavLink>
                                <Button href={this.props.product.product_url} className="col-lg-5 ml-1 btn btn-secondary" type="button" >Product Link</Button>
                                <NavLink className='col-lg-5 btn btn-secondary mt-2'
                                    to={this.checkLogin}
                                    onClick={this.submitWishlist}>
                                    Add to Wishlist
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row GreyBg'>
                    <div className='col-lg-6 mt-4 mr-5 ml-5 mb-4 rounded bg-white fit'>
                        <div className='m-3'>
                            <h4>{this.props.product.heading} Specification<hr /></h4>
                            <br />
                            {this.arrayDescription()}
                        </div>
                    </div>
                    <div className='col-lg-11 mt-4 mr-5 ml-5 mb-5 rounded bg-white fit'>
                        {this.props.product.overview && <div className='m-3'>{parse(this.props.product.overview)}</div>}
                    </div>
                </div>
            </div >
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getProductDetail,
        postUserWishlist,
    }, dispatch)
}

const mapStateToProps = state => {
    const { product, loading } = state.productDetailReducer;
    const { loggedIn, user } = state.loginReducer;
    return {
        product,
        loggedIn,
        user,
        loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);