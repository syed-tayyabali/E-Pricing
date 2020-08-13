import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/layout';
import Home from './screens/Home'
import Category from './screens/Home/category';
import Products from './screens/products';

class App extends Component {
  render() {

    let routes = (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/category' component={Category} />
        <Route exact path='/products/:id' component={Products} />
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

export default withRouter(App);
