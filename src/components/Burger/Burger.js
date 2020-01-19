import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import PropTypes from 'prop-types'

const burger = props => {

    const transformedIngredient = Object.keys(props.ingredients).map(key => {
        return [...Array(props.ingredients[key])].map((_, index) => {
            return <BurgerIngredient key={key + index} type={key} />
        })
    })

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )

}

burger.propTypes = {
    ingredients: PropTypes.objectOf(PropTypes.number)
}

export default burger;