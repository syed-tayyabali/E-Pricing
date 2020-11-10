import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';

import { getHomeProducts } from '../../store/actions/Home';
import './index.css';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getHomeProducts();
    }

    productImg = (product) => {
        let productImg = <img src={`${product.productSmallImg}`} className='card-img-top mt-3 mb-3'></img>;
        if (!product.productSmallImg) {
            productImg = <img src={`${product.productLargeImg}`} className='card-img-top mt-3 mb-3' height='200' width='150'></img>;
        }
        return productImg
    }


    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3
        };
        return (
            <>
                <div className='container bg-light rounded mb-4 mt-4'>
                    <h3 className='text-black-50'>MOBILES</h3>
                    <div className="span11">
                        <div className="row-fluid">
                            {this.props.homeProducts && this.props.homeProducts.mobiles && this.props.homeProducts.mobiles.map((product) => (
                                <NavLink to={`/product/${product._id}`} className='col-lg-2 rounded m-3 card'>
                                    {this.productImg(product)}
                                    <h6 className='text-black-50 indox text-wrap'>{product.heading}</h6>
                                    <h4 className='btn btn-primary'>{product.price}</h4>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='container bg-light rounded mb-4'>
                    <h3 className='text-black-50'>LAPTOPS</h3>
                    <div className="span11">
                        <div className="row-fluid">
                            {this.props.homeProducts && this.props.homeProducts.laptops && this.props.homeProducts.laptops.map((product) => (
                                <NavLink to={`/product/${product._id}`} className='col-lg-2 rounded m-3 card'>
                                    {this.productImg(product)}
                                    <h6 className='text-black-50 indox text-wrap'>{product.heading}</h6>
                                    <h4 className='btn btn-primary'>{product.price}</h4>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='container bg-light rounded mb-4'>
                    <h3 className='text-black-50'>TABLETS</h3>
                    <div className="span11">
                        <div className="row-fluid">
                            {this.props.homeProducts && this.props.homeProducts.tablets && this.props.homeProducts.tablets.map((product) => (
                                <NavLink to={`/product/${product._id}`} className='col-lg-2 rounded m-3 card'>
                                    {this.productImg(product)}
                                    <h6 className='text-black-50 indox text-wrap'>{product.heading}</h6>
                                    <h4 className='btn btn-primary'>{product.price}</h4>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>

                {/* <div className='container bg-light rounded mb-4'>
                    <h3 className='text-black-50'>TABLETS</h3>
                    <Slider {...settings}>
                        <div className='row-fluid'>
                            {this.props.homeProducts && this.props.homeProducts.tablets && this.props.homeProducts.tablets.map((product) => (
                                <NavLink to={`/product/${product._id}`} className='col-lg-2 rounded m-3 card'>
                                    {this.productImg(product)}
                                    <h6 className='text-black-50 inbox'>{product.heading}</h6>
                                    <h4 className='btn btn-primary'>{product.price}</h4>
                                </NavLink>
                            ))}
                        </div>
                    </Slider>
                </div> */}
            </>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getHomeProducts
    }, dispatch);
}

const mapStateToProps = state => {
    const { homeProducts } = state.homeReducer;
    return {
        homeProducts
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);