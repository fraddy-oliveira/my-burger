import React, { Component } from 'react'

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary'

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
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} />
            </div>
        )
    }
}

export default Checkout;