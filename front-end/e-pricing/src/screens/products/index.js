import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

import { getProducts, getProductsWebCollection } from '../../store/actions/Products';
import { getWebCollection } from '../../store/actions/WebCollection';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import './index.css';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            webCollectionId: props.match.params.webCollectionId,
            loading: false
        };
    }

    componentDidUpdate(prevProps) {
        const { loading } = prevProps;
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({ id: this.props.match.params.id }, () => {
                this.props.getProducts(this.state.id);
                this.props.getWebCollection(this.state.id);
            })
        }
        if (this.props.match.params.webCollectionId && prevProps.match.params.webCollectionId !== this.props.match.params.webCollectionId) {
            this.setState({ id: this.props.match.params.id, webCollectionId: this.props.match.params.webCollectionId }, () => {
                this.props.getProductsWebCollection(this.state.id, this.state.webCollectionId);
                this.props.getWebCollection(this.state.id);
            })
        }
        if (prevProps.match.params.webCollectionId && !this.props.match.params.webCollectionId) {
            this.setState({ id: this.props.match.params.id }, () => {
                this.props.getProducts(this.state.id);
                this.props.getWebCollection(this.state.id);
            })
        }
        if (loading !== this.props.loading) {
            this.setState({ loading: this.props.loading });
        }

    }

    componentDidMount() {
        const { id, webCollectionId } = this.state;
        this.props.getWebCollection(id);
        if (webCollectionId) {
            this.props.getProductsWebCollection(id, webCollectionId);
        } else if (id) {
            this.props.getProducts(id);
        }
    }

    productImg = (product) => {
        console.log(product)
        let productImg = <img src={`${product.productSmallImg}`} className='card-img-top'></img>;
        if (!product.productSmallImg) {
            productImg = <img src={`${product.productLargeImg}`} className='card-img-top' height='200' width='150'></img>;
        }
        return productImg
    }

    webCollectionLength = () => {
        let webLength = this.props.WebCollection.map((WebCollection, index) => (
            < NavLink to={`/products/${WebCollection.type}/${WebCollection._id}`} className='col-sm-4 btn btn-info'>
                <h5>{WebCollection.name}</h5>
            </NavLink>
        ));
        if (this.props.WebCollection.length < 3) {
            webLength = this.props.WebCollection.map((WebCollection, index) => (
                < NavLink to={`/products/${WebCollection.type}/${WebCollection._id}`} className='col-sm-6 btn btn-info'>
                    <h5>{WebCollection.name}</h5>
                </NavLink>
            ))
        }
        return webLength;
    }

    render() {
        return (
            <Aux>
                <div className='container-fluid'>
                    <div className='row '>
                        {this.webCollectionLength()}
                    </div>
                </div>
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-lg-2">
                            <h2>Filters</h2>
                        </div>
                        <div className='col-lg-10'>
                            <div className="row">
                                {this.props.products.map((product) => (
                                    <NavLink to={`/product/${product._id}`} className='col-xl-2 col-md-6 col-grid-box m-3 card'>
                                        {this.productImg(product)}
                                        <p>{product.heading}</p>
                                        <h4 className='btn btn-primary'>{product.price}</h4>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Aux >
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getProducts,
        getProductsWebCollection,
        getWebCollection
    }, dispatch)
}

const mapStateToProps = state => {
    const { products, loading } = state.products;
    const { WebCollection, loader } = state.WebCollectionReducer;
    return {
        products,
        WebCollection,
        loader,
        loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);