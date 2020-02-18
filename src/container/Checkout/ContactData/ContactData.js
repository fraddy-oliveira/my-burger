import React, { Component } from 'react';

import Button from './../../../components/UI/Button/Button'

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
            }
        };
    }

    render() {
        return (
            <div class={classes.ContactData}>
                <h4>Enter your contact details below:</h4>
                <form>
                    <input class={classes.Input} type="text" name="name" />
                    <input class={classes.Input} type="text" name="email" />
                    <input class={classes.Input} type="text" name="street" />
                    <input class={classes.Input} type="text" name="postalCode" />
                    <Button btnType="Success" clicked>Order</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;