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
import * as burgerBuilderActions from '../../store/actions/index';

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
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  componentDidMount() {
    // axiosInstance
    //   .get('/ingredients.json')
    //   .then(response => {
    //     if (response && response.data) {
    //       this.setState(
    //         prevState => ({
    //           ingredients: response.data,
    //         }),
    //         () => {
    //           this.updatePurchasable({ ...this.props.ings });
    //         }
    //       );
    //     } else {
    //       throw new Error();
    //     }
    //   })
    //   .catch(err => {
    //     this.setState({ error: true });
    //   });
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
    ings: state.ingredients,
    totalPrice: state.totalPrice,
    error: state.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: ingCode =>
      dispatch(burgerBuilderActions.addIngredient(ingCode)),
    removeIngredient: ingCode =>
      dispatch(burgerBuilderActions.removeIngredient(ingCode)),
    initIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosInstance));
