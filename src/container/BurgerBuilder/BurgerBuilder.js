import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from './../../components/Burger/Burger';
import BurgerControls from './../../components/Burger/BurgerControls/BurgerControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/OrderSummary/OrderSummary';
import axiosInstance from './../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
    };
  }

  updatePurchasable(ingredients) {
    let sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, val) => sum + val, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.purchaseBurgerInit();
    this.props.history.push('/checkout');
  };

  componentDidMount() {
    this.props.initIngredients();
  }

  render() {
    const disableInfo = { ...this.props.ings };

    Object.keys(disableInfo).map(
      type => (disableInfo[type] = disableInfo[type] <= 0)
    );

    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients cannot be fetched</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BurgerControls
            addIngredient={this.props.addIngredient}
            removeIngredient={this.props.removeIngredient}
            price={this.props.totalPrice}
            disableInfo={disableInfo}
            enableOrder={this.updatePurchasable({ ...this.props.ings })}
            ordered={this.purchaseHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          totalPrice={this.props.totalPrice}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          ingredients={this.props.ings}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          loading={this.state.loading}
          closeModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: ingCode => dispatch(actionCreators.addIngredient(ingCode)),
    removeIngredient: ingCode =>
      dispatch(actionCreators.removeIngredient(ingCode)),
    initIngredients: () => dispatch(actionCreators.initIngredients()),
    purchaseBurgerInit: () => dispatch(actionCreators.purchaseBurgerInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosInstance));
