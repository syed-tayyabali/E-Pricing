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
            filters: {
                brand: '',
                category: '',
            },
            loading: false,
            visible: false,
            minPrice: '',
            maxPrice: '',
        };

        this.onPriceChange = this.onPriceChange.bind(this);
        this.onToggleButton = this.onToggleButton.bind(this);
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
        console.log('products category mounted', this.props.categories);
    }

    componentDidMount() {
        this.props.getWebCollection(this.state.id);
        this.getProductsAction();
        console.log('products category', this.props.categories);
    }

    getProductsAction(filters = null) {
        const { id, webCollectionId } = this.state;
        this.props.getProducts(id, filters, webCollectionId);
    }

    onFilterChange = (event) => {
        this.setState({ filters: { ...this.state.filters, brand: event.target.value } });
    }

    onFilterSubmit = (event) => {
        this.getProductsAction(this.state.filters);
        event.preventDefault();
    }

    onCategoryChange = (event) => {
        this.setState({ filters: { ...this.state.filters, category: event.target.value } })
    }

    onClearFilter = () => {
        this.setState({
            filters: {
                ...this.state.filters,
                category: '',
            }
        });
    }

    onPriceSubmit = (event) => {
        this.setState({
            minPrice: this.state.minPrice,
            maxPrice: this.state.maxPrice
        });
        event.preventDefault();
    }

    onPriceChange = (event) => {
        this.setState({
            minPrice: event.target.value,
        });
    }

    onToggleButton = () => {
        this.setState({ visible: !this.state.visible });
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
            < NavLink to={`/products/${WebCollection.type}/${WebCollection._id}`} className='col-sm-4 btn btn-info font-italic'>
                <h5>{WebCollection.name}</h5>
            </NavLink>
        ));
        if (this.props.WebCollection.length < 3) {
            webLength = this.props.WebCollection.map((WebCollection, index) => (
                < NavLink to={`/products/${WebCollection.type}/${WebCollection._id}`} className='col-sm-6 btn btn-info font-italic'>
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
                                    <Button onClick={this.onToggleButton}
                                        className='font-italic'
                                        variant="outline-info mt-2 mb-3"
                                    >Search By Name</Button>
                                    {this.state.visible &&
                                        <div>
                                            <div>
                                                <Form onSubmit={this.onFilterSubmit} alignment='down'>
                                                    <FormControl type="text"
                                                        placeholder="Search"
                                                        className="mr-sm-2"
                                                        value={this.state.brand}
                                                        onChange={this.onFilterChange} />
                                                    <Button variant="outline-success mt-2 mb-3 btn-sm" type='submit'>Search</Button>
                                                </Form>
                                            </div>
                                            {/* <div className="">
                                                <label htmlFor="customRange1">Example range</label>
                                                <input type="range" min={5000} max={100000} className="custom-range" id="customRange1" />
                                            </div> */}
                                        </div>
                                    }
                                </div>
                                <div className='col-lg-12 bg-white rounded mt-4'>
                                    <h4 className='text-muted font-italic'>Product Category<hr /></h4>
                                    {this.props.categories.map((category) => (
                                        <div>
                                            <ul>
                                                <li className=''>
                                                    <label className='text-muted font-italic'>{category}</label>
                                                    <input className='ml-2' type='checkbox' value={category} checked={category === this.state.filters.category} onChange={this.onCategoryChange} />
                                                </li>
                                            </ul>
                                        </div>
                                    ))}
                                    <Button variant="outline-success mt-2 mb-3 btn-sm" onClick={this.onFilterSubmit}>Submit Category</Button>
                                    <Button variant="outline-danger mt-2 mb-3 ml-2 btn-sm" onClick={this.onClearFilter}>CLEAR</Button>
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
    const { products, loading, categories } = state.products;
    const { WebCollection, loader } = state.WebCollectionReducer;
    return {
        products,
        WebCollection,
        categories,
        loader,
        loading,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);