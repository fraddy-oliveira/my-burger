import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from './../../components/Burger/Burger';
import BurgerControls from './../../components/Burger/BurgerControls/BurgerControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/OrderSummary/OrderSummary';
import axiosInstance from './../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
  salad: 0.1,
  meat: 0.7,
  cheese: 1,
  bacon: 0.9,
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false,
    };
  }

  addIngredientHandler = type => {
    let typeIngredientCount = this.state.ingredients[type];
    let updatedTypeIngredientCount = typeIngredientCount + 1;

    let ingredients = { ...this.state.ingredients };
    ingredients[type] = updatedTypeIngredientCount;

    let totalPrice = this.state.totalPrice;
    totalPrice = totalPrice + INGREDIENTS_PRICE[type];

    this.setState({ ingredients: ingredients, totalPrice: totalPrice });

    this.updatePurchasable(ingredients);
  };

  removeIngredientHandler = type => {
    let typeIngredientCount = this.state.ingredients[type];

    if (typeIngredientCount <= 0) {
      return;
    }

    let updatedTypeIngredientCount = typeIngredientCount - 1;

    let ingredients = { ...this.state.ingredients };
    ingredients[type] = updatedTypeIngredientCount;

    let totalPrice = this.state.totalPrice;
    totalPrice = totalPrice - INGREDIENTS_PRICE[type];

    this.setState({ ingredients: ingredients, totalPrice: totalPrice });

    this.updatePurchasable(ingredients);
  };

  updatePurchasable(ingredients) {
    let sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, val) => sum + val, 0);

    this.setState({ purchasable: sum > 0 });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    let queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingredients[i])
      );
    }

    queryParams.push('price=' + this.state.totalPrice);

    const queryStr = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryStr,
    });
  };

  componentDidMount() {
    axiosInstance
      .get('/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  render() {
    const disableInfo = { ...this.state.ingredients };

    Object.keys(disableInfo).map(
      type => (disableInfo[type] = disableInfo[type] <= 0)
    );

    let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = this.state.error ? (
      <p>Ingredients cannot be fetched</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BurgerControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            price={this.state.totalPrice}
            disableInfo={disableInfo}
            enableOrder={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          totalPrice={this.state.totalPrice}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axiosInstance);
