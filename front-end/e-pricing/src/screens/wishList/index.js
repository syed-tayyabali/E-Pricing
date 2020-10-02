import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { getUserWishlist, postUserWishlist, userUpdateWishlist, deleteUserWishList } from '../../store/actions/WishList';
import { connect } from 'react-redux';

class WishList extends Component {

    componentDidMount() {
        this.props.getUserWishlist(this.props.user._id);
        console.log('wishList user id', this.props.user._id);
    }

    render() {
        return (
            <div>
                <h1>WishList page success</h1>
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