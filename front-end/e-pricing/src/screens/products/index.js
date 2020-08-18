import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

import { getProducts, getProductsWebCollection } from '../../store/actions/Products';
import { getWebCollection } from '../../store/actions/WebCollection';
import Aux from '../../hoc/Auxilliary/Auxilliary';

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

    render() {
        return (
            <Aux>
                <div className='container'>
                    <div className='row ml-5'>
                        {this.props.WebCollection.map((WebCollections, index) => (
                            <NavLink to={`/products/${WebCollections.type}/${WebCollections._id}`} className='col-sm-4'>
                                <h5>{WebCollections.name}</h5>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className='container'>
                    <div className='row ml-5'>
                        {this.props.products.map((products) => (
                            <NavLink to={`/product/${products._id}`} className='col-sm-3'>
                                <h5>{products.heading}</h5>
                                <h5>{products.price}</h5>
                                {/* <img src={`${products.productLargeImg}`}></img> */}
                                <img src={`${products.productSmallImg}`}></img>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </Aux>
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