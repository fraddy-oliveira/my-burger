import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import PropTypes from 'prop-types';

const burger = props => {
  let transformedIngredient =
    props.ingredients &&
    Object.keys(props.ingredients)
      .map(key => {
        return [...Array(props.ingredients[key])].map((_, index) => {
          return <BurgerIngredient key={key + index} type={key} />;
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);

  if (
    Array.isArray(transformedIngredient) &&
    transformedIngredient.length === 0
  ) {
    transformedIngredient = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

burger.propTypes = {
  ingredients: PropTypes.objectOf(PropTypes.number),
};

export default burger;
