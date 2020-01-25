import React from 'react'
import Aux from './../../hoc/Aux'

const orderSummary = (props) => {

    let ingredientsList = Object.keys(props.ingredients).map((igKey) => (
        <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{props.ingredients[igKey]}
        </li>
    ))

    return (
        <Aux>
            <p>Your order:</p>
            <p>A delicious burger has following ingredients:</p>
            <ul>
                {ingredientsList}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    )
}

export default orderSummary;