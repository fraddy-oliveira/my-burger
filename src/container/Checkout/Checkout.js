import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actionCreators from '../../store/actions/index';

class Checkout extends Component {
  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.replace(this.props.match.url + '/contact-data');
  };

  componentWillMount() {
    this.props.purchaseBurgerInit();
    // let searchParams = new URLSearchParams(this.props.location.search);
    // let ingredients = {};
    // let price = 0;
    // for (let param of searchParams.entries()) {
    //   if (param[0] === 'price') {
    //     price = +param[1];
    //   } else {
    //     ingredients[param[0]] = +param[1];
    //   }
    // }
    // this.setState({ ingredients: ingredients, totalPrice: price });
  }

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ing) {
      let purchasedDone = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedDone}
          <CheckoutSummary
            ingredients={this.props.ing}
            cancelCheckout={this.cancelCheckoutHandler}
            continueCheckout={this.continueCheckoutHandler}
          />
          <Route
            path={this.props.match.url + '/contact-data'}
            component={ContactData}
          />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burger.ingredients,
    purchased: state.order.purchased,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    purchaseBurgerInit: () => dispatch(actionCreators.purchaseBurgerInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
