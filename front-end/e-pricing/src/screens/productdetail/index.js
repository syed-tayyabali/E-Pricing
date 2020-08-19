import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import parse from 'html-react-parser'

import { getProductDetail } from '../../store/actions/productDetail';

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

    // arrayOverview = () => {
    //     if (!this.props.product.overview) {
    //         return null;
    //     }
    //     let overview = this.props.product.overview.map((moreDescribe) => {
    //         return parse(moreDescribe);
    //     })
    //     return overview;
    // }

    productImg = () => {
        let productImg = this.props.product.productLargeImg;
        if (!productImg) {
            productImg = this.props.product.productSmallImg;
        }
        return productImg
    }


    render() {
        console.log(this.props);
        if (this.props.loading) {
            return null;
        }
        return (
            <div className='container-fluid '>
                <div className='row bg-light'>
                    <div className='row mt-3 mr-5 ml-5 mb-3 bg-white rounded'>
                        <div className='col-lg-12'>
                            <h3>{this.props.product.heading}</h3>
                            <hr />
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <img src={`${this.productImg()}`} width='60%' ></img>

                        </div>
                        <div className='col-lg-8 mt-5'>
                            <h3>Rs. {this.props.product.price}</h3>
                            <h5>{this.props.product.product_url}</h5>
                        </div>
                    </div>
                </div>
                <div className='row bg-light'>
                    <div className='mt-3 mr-5 ml-5 mb-3 rounded bg-white'>
                        <div className='m-3'>
                            <h4>{this.props.product.heading} Specification<hr/></h4>
                            <br />
                            {this.arrayDescription()}
                            </div>
                    </div>
                    <div className='mt-3 mr-5 ml-5 mb-5 rounded bg-white'>
                        {this.props.product.overview && <div className='m-3'>{parse(this.props.product.overview)}</div>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getProductDetail
    }, dispatch)
}

const mapStateToProps = state => {
    const { product, loading } = state.productDetailReducer
    return {
        product,
        loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);