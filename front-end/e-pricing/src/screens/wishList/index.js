import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { getUserWishlist, postUserWishlist, userUpdateWishlist, deleteUserWishList } from '../../store/actions/WishList';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

class WishList extends Component {

    componentDidMount() {
        this.props.getUserWishlist(this.props.user._id);
        console.log('wishList user id', this.props.user._id);
    }

    render() {
        console.log('wislist products', this.props.products.heading);
        return (
            <div>
                <div className='d-flex justify-content-center py-5 bg-light font-weight-light text-muted'>
                    <h1 className='mr-4 mt-2'>MY WISHLIST </h1>
                    <svg width="5%" height="5%" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                </div>
                <div className='container'>
                    <ul className='list-group mt-2 mb-2'>
                        <li className='list-group-item'>
                            <div className='row'>
                                <div className='col-lg-7 ml-4 mt-2'>
                                    <p className='font-weight-bold'>samsung sdfsdfsdfsdfsgsdv sgefsdf ddsgdfgdf dgdfgdfg</p>
                                </div>
                                <div className='col-lg-2'>
                                    <p className='font-weight-bold mt-2 float-right'> Quantity: 1</p>
                                </div>
                                <div className='col-lg-2 ml-5 mt-1'>
                                    <Button variant="outline-danger float-right">Remove Item</Button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getUserWishlist,
        postUserWishlist,
        userUpdateWishlist,
        deleteUserWishList
    }, dispatch);
}

const mapStateToProps = state => {
    const { userId, products } = state.wishlistReducer;
    const { user } = state.loginReducer;
    return {
        userId,
        products,
        user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);