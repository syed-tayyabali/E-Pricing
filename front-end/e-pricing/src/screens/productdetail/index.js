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

    render() {
        console.log(this.props);
        if (this.props.loading) {
            return null;
        }
        return (
            <div>
                <h5>{this.props.product.heading}</h5>
                <h5>{this.props.product.price}</h5>
                <h5>{this.props.product.product_url}</h5>
                <img src={`${this.props.product.productLargeImg}`}></img>
                {this.props.product.description && <div>{parse(this.props.product.description[0])}</div>}
                {/* {this.props.product.description && <div>{parse(this.props.product.description[1])}</div>} */}
                {this.props.product.overview && <div>{parse(this.props.product.overview[0])}</div>}
                {this.props.product.overview && <div>{parse(this.props.product.overview[1])}</div>}
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