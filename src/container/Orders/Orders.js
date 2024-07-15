import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token);
  }

  render() {
    let orders = null;
    orders = this.props.orders.map(order => {
      return (
        <Order
          key={order.id}
          price={order.price}
          ingredients={order.ingredients}
        />
      );
    });

    if (this.props.loading) {
      orders = <Spinner />;
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: token => dispatch(actionCreators.fetchOrders(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
