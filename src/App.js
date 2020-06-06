import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.tryRelogin();
  }
  render() {
    const routesArr = [];
    if (this.props.isAuthenticated) {
      routesArr.push(<Route path="/orders" component={Orders} />);
      routesArr.push(<Route path="/checkout" component={Checkout} />);
      routesArr.push(<Route path="/logout" component={Logout} />);
    }
    routesArr.push(<Route path="/auth" component={Auth} />);
    routesArr.push(<Route path="/" component={BurgerBuilder} />);
    return (
      <div>
        <Layout>
          <Switch>{routesArr}</Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryRelogin: () => dispatch(actions.checkAuthState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
