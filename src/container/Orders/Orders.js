import React, { Component } from 'react';

import Order from './../../components/Order/Order';
import axios from './../../axios-orders';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get('/orders.json')
      .then(res => {
        const fetchedOrders = [];

        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        console.log('fetchedOrders', fetchedOrders);
        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  render() {
    let orders = null;
    orders = this.state.orders.map(order => {
      return (
        <Order
          key={order.id}
          price={order.price}
          ingredients={order.ingredients}
        />
      );
    });

    if (this.state.loading) {
      orders = <Spinner />;
    }
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
