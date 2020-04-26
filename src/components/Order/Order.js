import React from 'react';

import classes from './Order.css';

const Order = props => {
  let ingredients = null;
  let ingredientsKeys = Object.keys(props.ingredients);
  ingredients = ingredientsKeys.map(key => {
    return (
      <span key={key}>
        {props.ingredients[key]
          ? key + '(' + props.ingredients[key] + ') '
          : null}
      </span>
    );
  });
  
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>
        Price: <strong>USD {props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
