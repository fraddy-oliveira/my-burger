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
        Price:{' '}
        <strong>
          USD {Number(props.price) ? Number(props.price).toFixed(2) : ''}
        </strong>
      </p>
    </div>
  );
};

export default Order;
