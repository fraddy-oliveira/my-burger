import React from 'react';
import classes from './BurgerControls.css';
import BurgerControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const builderControls = props => {
  return (
    <div className={classes.BurgerControls}>
      <p>
        Current price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ingred => (
        <BurgerControl
          key={ingred.type}
          label={ingred.label}
          type={ingred.type}
          addIngredient={() => props.addIngredient(ingred.type)}
          removeIngredient={() => props.removeIngredient(ingred.type)}
          disabled={props.disableInfo[ingred.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.enableOrder}
        onClick={props.ordered}
      >
        {props.isAuthenticated ? 'Order Now' : 'Sign in to order'}
      </button>
    </div>
  );
};

export default builderControls;
