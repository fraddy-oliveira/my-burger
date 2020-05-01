import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.replace(this.props.match.url + '/contact-data');
  };

  componentWillMount() {
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
      summary = (
        <div>
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
    ing: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
