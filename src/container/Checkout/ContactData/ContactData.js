import React, { Component } from 'react';

import Button from './../../../components/UI/Button/Button'
import Spinner from './../../../components/UI/Spinner/Spinner'
import axiosInstance from './../../../axios-orders'

import classes from './ContactData.css'

class ContactData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: {
                street: "",
                postalCode: ""
            },
            loading: false
        };
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: this.state.name,
                email: this.state.email,
                address: this.state.address
            },
            deliveryMethod: "Bike"
        }
        axiosInstance.post("/orders.json", order).then(data => {
            this.setState({ loading: false })
            console.log("Order posting success")
            this.props.history.push("/")
        }).catch(error => {
            this.setState({ loading: false })
            console.log("Order posting failed", error)
        })
    }

    formInputHandler = (event) => {
        event.preventDefault()
        if (event.target.name === "name") {
            this.setState({ name: event.target.value })
        } else if (event.target.name === "email") {
            this.setState({ email: event.target.value })
        } else if (event.target.name === "street") {
            let address = { ...this.state.address }
            address.street = event.target.value

            this.setState({ address: address })
        } else if (event.target.name === "postalCode") {
            let address = { ...this.state.address }
            address.postalCode = event.target.value

            this.setState({ address: address })
        }
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text"
                    name="name" value={this.state.name} onChange={this.formInputHandler} />
                <input className={classes.Input} type="text"
                    name="email" value={this.state.email} onChange={this.formInputHandler} />
                <input className={classes.Input} type="text"
                    name="street" value={this.state.address.street} onChange={this.formInputHandler} />
                <input className={classes.Input} type="text"
                    name="postalCode" value={this.state.address.postalCode} onChange={this.formInputHandler} />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact details below:</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;