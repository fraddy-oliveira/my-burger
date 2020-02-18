import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: {
                'salad': 1,
                'meat': 0,
                'cheese': 1,
                'bacon': 0
            }
        }
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack()
    }

    continueCheckoutHandler = () => {
        this.props.history.replace(this.props.match.url + "/contact-data")
    }

    componentDidMount() {
        let searchParams = new URLSearchParams(this.props.location.search)
        let ingredients = {}

        for (let param of searchParams.entries()) {
            ingredients[param[0]] = +param[1]
        }

        this.setState({ ingredients: ingredients })
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancelCheckout={this.cancelCheckoutHandler}
                    continueCheckout={this.continueCheckoutHandler}
                />
                <Route
                    path={this.props.match.url + "/contact-data"}
                    component={ContactData}
                />
            </div>
        )
    }
}

export default Checkout;