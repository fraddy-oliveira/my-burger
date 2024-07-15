import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import Button from '../UI/Button/Button';

const orderSummary = props => {
  let ingredientsList = Object.keys(props.ingredients).map(igKey => (
    <li key={igKey}>
      <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
      {props.ingredients[igKey]}
    </li>
  ));

  return (
    <Aux>
      <p>Your order:</p>
      <p>A delicious burger has following ingredients:</p>
      <ul>{ingredientsList}</ul>
      <p>
        <strong>Total price: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button clicked={props.purchaseCancel} btnType="Danger">
        Cancel
      </Button>
      <Button clicked={props.purchaseContinue} btnType="Success">
        Continue
      </Button>
    </Aux>
  );
};

export default orderSummary;
