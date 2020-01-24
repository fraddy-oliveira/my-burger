import React, { Component } from 'react'
import Aux from './../../hoc/Aux'
import Burger from './../../components/Burger/Burger'
import BurgerControls from './../../components/Burger/BurgerControls/BurgerControls'

const INGREDIENTS_PRICE = {
    'salad': 0.1,
    'meat': 0.7,
    'cheese': 1,
    'bacon': 0.9
}

class BurgerBuilder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ingredients: {
                'salad': 0,
                'meat': 0,
                'cheese': 0,
                'bacon': 0
            },
            totalPrice: 4
        }
    }

    addIngredientHandler = (type) => {
        let typeIngredientCount = this.state.ingredients[type]
        let updatedTypeIngredientCount = typeIngredientCount + 1

        let ingredients = { ...this.state.ingredients }
        ingredients[type] = updatedTypeIngredientCount

        let totalPrice = this.state.totalPrice
        totalPrice = totalPrice + INGREDIENTS_PRICE[type]

        this.setState({ ingredients: ingredients, totalPrice: totalPrice })
    }

    removeIngredientHandler = (type) => {
        let typeIngredientCount = this.state.ingredients[type]

        if (typeIngredientCount <= 0) {
            return;
        }

        let updatedTypeIngredientCount = typeIngredientCount - 1

        let ingredients = { ...this.state.ingredients }
        ingredients[type] = updatedTypeIngredientCount

        let totalPrice = this.state.totalPrice
        totalPrice = totalPrice - INGREDIENTS_PRICE[type]

        this.setState({ ingredients: ingredients, totalPrice: totalPrice })
    }

    render() {

        const disableInfo = { ...this.state.ingredients }

        Object.keys(disableInfo).map(type => disableInfo[type] = disableInfo[type] <= 0)

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    disableInfo={disableInfo}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;