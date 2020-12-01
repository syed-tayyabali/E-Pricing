import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import parse from 'html-react-parser';
import Button from 'react-bootstrap/Button';

import { getProductComparsion } from '../../store/actions/ProductComparsion';
import { getProductDetail } from '../../store/actions/productDetail';
import './index.css'
import { custumParse } from '../../utilities';

class ProductComparison extends Component {
    constructor(props) {
        super(props);
        const { type, seller_keyId, heading, id } = this.getDataForComparison();
        this.state = {
            seller_keyId,
            type,
            filter: {
                heading,
                id
            },
            checkNextProduct: false
        }
    }

    getDataForComparison() {
        let query = new URLSearchParams(this.props.location.search);
        let type = query.get('type');
        let seller_keyId = query.get('seller_keyId');
        let heading = query.get('heading');
        let id = query.get('id');
        return {
            type,
            seller_keyId,
            heading,
            id
        }
    }

    componentDidMount() {
        const { type, seller_keyId, filter } = this.state;
        this.props.getProductComparsion(type, seller_keyId, filter);
        this.props.getProductDetail(this.state.filter.id);
    }

    arrayDescription = () => {
        if (!this.props.compairedProducts) {
            return null;
        }
        let description = this.props.compairedProducts.map((describe, index) => {
            return describe.description.map((table) => {
                return parse(table)
            })
        });
        return description;
    }

    arrayHeading = () => {
        let heading = this.props.compairedProducts.map(product => {
            return product.heading;
        });
        return heading;
    }

    arraySellerName = () => {
        let name = this.props.compairedProducts.map(product => {
            return product.seller_key;
        });
        return name;
    }

    productImg = (product) => {
        console.log('in productImg function ', product);
        if (!product) {
            return '';
        }
        let img = <img src={product.productLargeImg} width='60%' />;
        if (!product.productLargeImg) {
            img = <img src={product.productSmallImg} width='100%' />;
        }
        console.log('in productImg function return', img);
        return img;
    }

    toggleNextProduct = () => {
        this.setState({ checkNextProduct: !this.state.checkNextProduct });
    }

    prevProductImg = () => {
        let productImg = this.props.product.productLargeImg;
        if (!productImg) {
            productImg = this.props.product.productSmallImg;
        }
        return productImg
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

    render() {
        return (
            < div className='container-fluid GreyBg'>
                <div className='row ml-4'>
                    {/* previous mobile  */}
                    <div className='row col-lg-6 mt-3 mb-3 bg-white rounded'>
                        <div className='col-lg-12'>
                            <h3 className='m-3'>{this.props.product.heading}</h3>
                            <hr />
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <img className='ml-5' src={`${this.prevProductImg()}`} width='60%'></img>
                        </div>
                        <div className='col-lg-8'>
                            <h3 className='text-black-50 font-italic'>Seller: {this.props.product.seller_key}</h3>
                            <h3 className='text-black-50 font-italic'>Rs. {this.props.product.price}</h3>
                            <br />
                            <Button href={this.props.product.product_url} className="col-lg-5 ml-1 mb-3 btn btn-primary" type="button" >Product Link</Button>
                        </div>
                    </div>

                    {/* compaired mobile */}
                    {this.state.checkNextProduct ? this.props.compairedProducts[1] && <div className='row col-lg-6 mt-3 ml-4 mb-3 bg-white rounded'>
                        <div className='col-lg-12'>
                            <h3 className='m-3'>{this.props.compairedProducts[1].heading}</h3>
                            <hr />
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            {this.productImg(this.props.compairedProducts[1])}
                        </div>
                        <div className='col-lg-8'>
                            <h3 className='text-black-50 font-italic'>Seller: {this.props.compairedProducts[1].seller_key}</h3>
                            <h3 className='text-black-50 font-italic'>Rs. {this.props.compairedProducts[0].price}</h3>
                            <br />
                            <Button href={this.props.compairedProducts[1].product_url} className="col-lg-5 ml-1 mb-3 btn btn-primary" type="button" >Product Link</Button>
                        </div>
                    </div>
                        : this.props.compairedProducts[0] && <div className='row col-lg-6 mt-3 ml-4 mb-3 bg-white rounded'>
                            <div className='col-lg-12'>
                                <h3 className='m-3'>{this.props.compairedProducts[0].heading}</h3>
                                <hr />
                            </div>
                            <div className='col-lg-4 col-md-6 col-sm-12'>
                                {this.productImg(this.props.compairedProducts[0])}
                            </div>
                            <div className='col-lg-8'>
                                <h3 className='text-black-50 font-italic'>Seller: {this.props.compairedProducts[0].seller_key}</h3>
                                <h3 className='text-black-50 font-italic'>Rs. {this.props.compairedProducts[0].price}</h3>
                                <br />
                                <Button href={this.props.compairedProducts[0].product_url} className="col-lg-5 ml-1 mb-3 btn btn-primary" type="button" >Product Link</Button>
                            </div>
                        </div>
                    }

                    {/* previous Method */}
                    {/* {
                        this.props.compairedProducts.map((product, index) => {
                            return (
                                <div className='row col-lg-5 mt-3 mr-5 ml-5 mb-3 bg-white rounded'>
                                    <div className='col-lg-12'>
                                        <h3 className='m-3'>{product.heading}</h3>
                                        <hr />
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-12'>
                                        {this.productImg(product)}
                                    </div>
                                    <div className='col-lg-8'>
                                        <h3 className='text-black-50 font-italic'>Seller: {product.seller_key}</h3>
                                        <h3 className='text-black-50 font-italic'>Rs. {product.price}</h3>
                                        <br />
                                        <Button href={product.product_url} className="col-lg-5 ml-1 mb-3 btn btn-secondary" type="button" >Product Link</Button>
                                    </div>
                                </div>
                            )
                        })
                    } */}
                </div>

                <div className='row ml-1'>
                    {/* previous mobile */}
                    <div className='col-lg-6 mt-3 mb-3 bg-white rounded fit'>
                        <br />
                        <h4>{this.props.product.heading} Specification<hr /></h4>
                        <br />
                        {this.arrayDescription()}
                    </div>

                    {/* compaired mobile */}
                    {this.state.checkNextProduct ? this.props.compairedProducts[1] && <div className='col-lg mt-3 ml-2 mb-3 bg-white rounded fit'>
                        <br />
                        <h4>{this.props.compairedProducts[1].heading}</h4>
                        <hr />
                        <br />
                        {/* {custumParse(this.props.compairedProducts[1].description[0], this.props.compairedProducts[1].description)} */}
                        {this.props.compairedProducts[1].description && parse(this.props.compairedProducts[1].description[0])}
                    </div>
                        : this.props.compairedProducts && this.props.compairedProducts[0] && <div className='col-lg mt-3 ml-2 mb-3 bg-white rounded fit'>
                            <br />
                            <h4>{this.props.compairedProducts[0].heading}</h4>
                            <hr />
                            <br />
                            {parse(this.props.compairedProducts[0].description[0])}
                        </div>
                    }

                </div>
                <div className='row'>
                    <div className='col text-center'>
                        {
                            this.props.compairedProducts[1] ? <Button
                                className='col-lg-5 ml-1 mb-3 btn btn-primary'
                                onClick={this.toggleNextProduct}
                            >
                                Compare with {
                                    this.state.checkNextProduct ? this.props.compairedProducts[0] && this.props.compairedProducts[0].seller_key
                                        : this.props.compairedProducts[1] && this.props.compairedProducts[1].seller_key
                                } Product
                    </Button> : null
                        }
                    </div>
                </div>
            </div >
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getProductComparsion,
        getProductDetail
    }, dispatch)
}

const mapStateToProps = state => {
    const { loader, compairedProducts } = state.productComparsionReducer;
    const { product, loading } = state.productDetailReducer;
    return {
        compairedProducts,
        loader,
        product,
        loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductComparison);