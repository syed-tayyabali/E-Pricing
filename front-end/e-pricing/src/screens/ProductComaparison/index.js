import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import parse from 'html-react-parser';
import Button from 'react-bootstrap/Button';

import { getProductComparsion } from '../../store/actions/ProductComparsion';
import { getProductDetail } from '../../store/actions/productDetail';
import './index.css'

class ProductComparison extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                heading: '',
                id: '',
            }
        }
    }

    getCompariedProductActions() {
        let query = new URLSearchParams(this.props.location.search);
        let type = query.get('type');
        let seller_keyId = query.get('seller_keyId');
        let heading = query.get('heading');
        let id = query.get('id');
        console.log('this is  id', id);
        this.setState({
            filter: {
                ...this.state.filter,
                heading: heading,
                id: id
            }
        }, () => this.props.getProductComparsion(type, seller_keyId, this.state.filter)
        )
    }

    // componentDidUpdate() {
    //     if (this.state.filter.id)
    //         this.props.getProductDetail(this.state.filter.id);
    // }

    componentDidMount() {
        this.getCompariedProductActions();
        if (this.state.filter.id)
            console.log('in did mount state', this.state.filter.id)
        // this.props.getProductDetail(this.state.filter.id);
        // console.log(this.props)
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

    productImg = (product) => {
        if (!product) {
            return '';
        }
        let img = <img src={product.productLargeImg} width='60%' />;
        if (!product.productLargeImg) {
            img = <img src={product.productSmallImg} width='100%' />;
        }
        return img;
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

    render() {
        return (
            < div className='container-fluid GreyBg'>
                <div className='row ml-4'>
                    {
                        this.props.compairedProducts.map((product, index) => {
                            return (
                                <div className='row col-lg-5 mt-3 mr-5 ml-5 mb-3 bg-white rounded'>
                                    <div className='col-lg-12'>
                                        <h3 className='m-3'>{product.heading}</h3>
                                        <hr />
                                        <p>{product.seller_key}</p>
                                        <hr />
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-12'>
                                        {this.productImg(product)}
                                    </div>
                                    <div className='col-lg-8'>
                                        <h3 className='text-black-50 font-italic'>Rs. {product.price}</h3>
                                        <br />
                                        <Button href={product.product_url} className="col-lg-5 ml-1 mb-3 btn btn-secondary" type="button" >Product Link</Button>
                                    </div>
                                </div>

                                //     { < div >
                                // { product.overview && <div className='m-3'>{parse(product.overview)}</> }
                                //     </div> }
                            )
                        })
                    }
                </div>
                <div className='row ml-4'>
                    {this.props.compairedProducts.map(product => {
                        const description = product.description[0];
                        return description && <div className='col-lg-4 mt-4 ml-5 mr-5 mb-4 rounded bg-white fit'>
                            <div className='m-3'>
                                <br />
                                <h4>{product.heading}</h4>
                                <hr />
                                {parse(description)}
                            </div>
                        </div>;
                    })}
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