import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Layout from './hoc/layout';
import Home from './screens/Home'
import Category from './screens/Home/category';
import Products from './screens/products';
import ProductDetail from './screens/productdetail';
import ProductComparison from './screens/ProductComaparison';
import Register from './screens/Register';
import Login from './screens/Login';
import TestScreen from './screens/testScreen/testScreen';
import { checkLogin } from './store/actions/Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.checkLogin();
  }

  render() {
    console.log(this.props.loggedIn);
    let routes = (
      <Switch>
        <Route exact path='/testScreen' component={TestScreen} />
        <Route exact path='/' component={Home} />
        <Route exact path='/category' component={Category} />
        <Route exact path='/products/:id' component={Products} />
        <Route exact path='/products/:id/:webCollectionId' component={Products} />
        <Route exact path='/product/:id' component={ProductDetail} />
        <Route exact path='/productComaparison' component={ProductComparison} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        {/* <Redirect to='/' /> */}
      </Switch>
    )
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    checkLogin
  }, dispatch)
}

const mapStateToProps = state => {
  const { loggedIn, user } = state.loginReducer;
  return {
    loggedIn,
    user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));