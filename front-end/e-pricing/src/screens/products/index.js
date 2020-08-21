import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

import { getProducts } from '../../store/actions/Products';
import { getWebCollection } from '../../store/actions/WebCollection';
import { getProductCategory } from '../../store/actions/ProductCategory';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import './index.css';
import { Form } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            webCollectionId: props.match.params.webCollectionId ? props.match.params.webCollectionId : null,
            loading: false,
            brand: '',
        };

        this.onFilterChange = this.onFilterChange.bind(this);
        this.onFilterSubmit = this.onFilterSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { loading } = prevProps;
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({ id: this.props.match.params.id }, () => {
                this.props.getProducts(this.state.id);
                this.props.getWebCollection(this.state.id);
            })
        }
        console.log(this.props);
        if (this.props.match.params.webCollectionId && prevProps.match.params.webCollectionId !== this.props.match.params.webCollectionId) {
            this.setState({ id: this.props.match.params.id, webCollectionId: this.props.match.params.webCollectionId }, () => {
                this.props.getProducts(this.state.id, null, this.state.webCollectionId);
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
        this.props.getWebCollection(this.state.id);
        this.getProductsAction();
        this.props.getProductCategory();
    }

    getProductsAction(filters = null) {
        const { id, webCollectionId } = this.state;
        this.props.getProducts(id, filters, webCollectionId);
    }

    onFilterSubmit = (event) => {
        this.setState({ brand: this.state.brand });
        this.getProductsAction({ brand: this.state.brand });
        event.preventDefault();
    }

    onFilterChange = (event) => {
        this.setState({ brand: event.target.value });
    }

    productImg = (product) => {
        let productImg = <img src={`${product.productSmallImg}`} className='card-img-top mt-3 mb-3'></img>;
        if (!product.productSmallImg) {
            productImg = <img src={`${product.productLargeImg}`} className='card-img-top mt-3 mb-3' height='200' width='150'></img>;
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
                    <div className='row'>
                        {this.webCollectionLength()}
                    </div>
                </div>

                <div className='container-fluid'>
                    <div className="row GreyBg">
                        <div className="col-lg-2 mt-4 ml-5 filter">
                            <div className='row'>
                                <div className='col-lg-12 col-md-12 col-sm-12 bg-white rounded'>
                                    <h4 className='text-muted font-italic'>FILTERS<hr /></h4>
                                    <Form onSubmit={this.onFilterSubmit}>
                                        <FormControl type="text"
                                            placeholder="Search"
                                            className="mr-sm-2"
                                            value={this.state.brand}
                                            onChange={this.onFilterChange} />
                                        <Button variant="outline-success mt-2 mb-3" type='submit'>Search</Button>
                                    </Form>
                                </div>
                                <div className='col-lg-12 bg-white rounded mt-4'>
                                    <h4 className='text-muted font-italic'>Product Category<hr /></h4>
                                    {this.props.products.map((product) => (
                                        <ul>
                                            <li>
                                                {product.category}
                                            </li>
                                        </ul>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <div className='col-lg-9 ml-5'>
                            <div className="row">
                                {this.props.products.map((product) => (
                                    <NavLink to={`/product/${product._id}`} className='col-xl-2 col-md-6 col-grid-box m-3 card'>
                                        {this.productImg(product)}
                                        <p className='text-black-50'>{product.heading}</p>
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
        getWebCollection,
        getProductCategory
    }, dispatch)
}

const mapStateToProps = state => {
    const { products, loading } = state.products;
    const { WebCollection, loader } = state.WebCollectionReducer;
    const { productCategory } = state.productCategoryReducer;
    return {
        products,
        WebCollection,
        productCategory,
        loader,
        loading,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);