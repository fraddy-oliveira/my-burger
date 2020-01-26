import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from './../../components/Burger/Burger'
import BurgerControls from './../../components/Burger/BurgerControls/BurgerControls'
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from './../../components/OrderSummary/OrderSummary'

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
            totalPrice: 4,
            purchasable: false,
            purchasing: false
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

        this.updatePurchasable(ingredients)
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

        this.updatePurchasable(ingredients)
    }

    updatePurchasable(ingredients) {
        let sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, val) => sum + val, 0)

        this.setState({ purchasable: sum > 0 })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        alert('You continue with order')
    }

    render() {

        const disableInfo = { ...this.state.ingredients }

        Object.keys(disableInfo).map(type => disableInfo[type] = disableInfo[type] <= 0)

        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    <OrderSummary
                        totalPrice={this.state.totalPrice}
                        purchaseCancel={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                        ingredients={this.state.ingredients} />
                </Modal>
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
        )
    }
}

export default BurgerBuilder;