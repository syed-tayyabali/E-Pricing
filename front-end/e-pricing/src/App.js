import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/layout';
import index from './screens/Home/index'
import category from './screens/Home/category';

class App extends Component {
  render() {

    let routes = (
      <Switch>
        <Route exact path='/' component = {index}/>
        <Route exact path='/category' component = {category}/>
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
