import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import parse from 'html-react-parser';

import { getProductComparsion } from '../../store/actions/ProductComparsion';
import './index.css'

class ProductComparison extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                heading: ''
            }
        }
    }

    query = () => {
        let query = new URLSearchParams(this.props.location.search);
        let type = query.get('type');
        let seller_keyId = query.get('seller_keyId');
        let heading = query.get('heading');
        let id = query.get('id');
        let compareTypes = [type, seller_keyId, heading, id];
        return compareTypes
    }

    getCompariedProductActions() {
        let query = new URLSearchParams(this.props.location.search);
        let type = query.get('type');
        let seller_keyId = query.get('seller_keyId');
        let heading = query.get('heading');
        this.setState({
            filter: {
                ...this.state.filter,
                heading: heading
            }
        }, () => this.props.getProductComparsion(type, seller_keyId, this.state.filter)
        )
    }

    // componentDidUpdate() {
    //     let query = new URLSearchParams(this.props.location.search);
    //     let type = query.get('type');
    //     let seller_keyId = query.get('seller_keyId');
    //     this.props.getProductComparsion(type, seller_keyId, this.state.filter);
    // }

    componentDidMount() {
        this.getCompariedProductActions();
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

    render() {
        return (
            < div className='container-fluid GreyBg'>
                <div className='row ml-5'>
                    {
                        this.props.compairedProducts.map((product, index) => (

                            <div className='m-3 ml-5 card'>
                                <h4 className='text-black-50 ml-3'>{product.heading}</h4>
                                {console.log('heading', product.heading)}
                                <div className='col-lg-5 col-md-6 col-sm-12 ml-2'>
                                    {this.productImg(product)}
                                </div>
                        <p>{product.product_url}</p>
                                <h5 className='text-black-50 ml-4'>Rs.{product.price}</h5>
                            </div>


                            //     { < div >
                            // { product.overview && <div className='m-3'>{parse(product.overview)}</> }
                            //     </div> }
                        ))
                    }
                </div>
                <div className='row ml-5'>
                    <div className='col-lg-6 mt-4 mr-4 ml-5 mb-4 rounded bg-white fit'>
                        <div className='m-3'>
                            <br />
                            {this.arrayDescription()[0]}
                        </div>
                    </div>
                    {this.arrayDescription()[1] ?
                        <div className='col-lg-4 mt-4 mr-5 mb-4 rounded bg-white fit'>
                            <div className='m-3'>
                                <br />
                                {this.arrayDescription()[1]}
                            </div>
                        </div> : null
                    }
                </div>
            </div >
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getProductComparsion
    }, dispatch)
}

const mapStateToProps = state => {
    const { loading, compairedProducts } = state.productComparsionReducer;
    return {
        compairedProducts,
        loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductComparison);