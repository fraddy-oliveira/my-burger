import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axiosInstance from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import * as actionCreators from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as forms from '../../../utils/forms';

import classes from './ContactData.module.css';

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: forms.formConfig('input', {
          type: 'text',
          name: 'name',
          placeholder: 'Name',
          value: '',
          validation: {
            required: true,
          },
        }),
        email: forms.formConfig('input', {
          type: 'text',
          name: 'email',
          placeholder: 'Email',
          validation: {
            required: true,
            isEmail: true,
          },
        }),
        street: forms.formConfig('input', {
          type: 'text',
          name: 'street',
          placeholder: 'Street',
          validation: {
            required: true,
          },
        }),
        postalCode: forms.formConfig('input', {
          type: 'text',
          name: 'postalCode',
          placeholder: 'Post code',
          validation: {
            required: true,
          },
        }),
        country: forms.formConfig('select', {
          name: 'country',
          options: [
            {
              value: 'india',
              displayValue: 'India',
            },
            {
              value: 'uk',
              displayValue: 'United Kingdom',
            },
          ],
          value: 'uk',
          validation: {
            required: true,
          },
        }),
        deliveryMethod: forms.formConfig('select', {
          name: 'deliveryMethod',
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest',
            },
            {
              value: 'slowest',
              displayValue: 'Slowest',
            },
          ],
          value: 'slowest',
          validation: {
            required: true,
          },
        }),
      },
    };
  }

  submitHandler = event => {
    event.preventDefault();
    let orderForm = { ...this.state.orderForm };

    for (let fieldName in orderForm) {
      const { valid, errorMessage } = forms.checkFieldValidity(
        orderForm[fieldName].value,
        orderForm[fieldName].elementConfig.validation,
        orderForm[fieldName].elementConfig.placeholder
      );

      orderForm[fieldName].valid = valid;

      orderForm[fieldName].elementConfig = {
        ...orderForm[fieldName].elementConfig,
        errorMessage,
      };

      orderForm[fieldName].touched = true;
    }

    this.setState(
      prevState => {
        return { orderForm: orderForm };
      },
      () => {
        this.orderHandler();
      }
    );
  };

  orderHandler = () => {
    let formData = {},
      orderForm = { ...this.state.orderForm };

    if (!forms.checkFormValidity(orderForm)) {
      console.log('form validation failed');
      return;
    }

    for (let fieldName in orderForm) {
      formData[fieldName] = orderForm[fieldName].value;
    }

    const order = {
      ingredients: this.props.ing,
      price: Number(this.props.totalPrice).toFixed(2),
      customer: { ...formData },
    };

    this.props.purchaseBurger(order, this.props.token);
  };

  formInputHandler = event => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    if (
      this.state.orderForm &&
      this.state.orderForm.hasOwnProperty(fieldName)
    ) {
      const { valid: fieldValid, errorMessage } = forms.checkFieldValidity(
        fieldValue,
        {
          ...this.state.orderForm[fieldName].elementConfig.validation,
        },
        this.state.orderForm[fieldName].elementConfig.placeholder
      );

      this.setState(preState => {
        return {
          orderForm: {
            ...preState.orderForm,
            [fieldName]: {
              ...preState.orderForm[fieldName],
              value: fieldValue,
              valid: fieldValid,
              touched: true,
              elementConfig: {
                ...preState.orderForm[fieldName].elementConfig,
                errorMessage,
              },
            },
          },
        };
      });
    }
  };

  render() {
    let form = (
      <form onSubmit={this.submitHandler}>
        {Object.keys(this.state.orderForm).map(fieldName => {
          return (
            <Input
              key={fieldName}
              elementType={this.state.orderForm[fieldName].elementType}
              elementConfig={this.state.orderForm[fieldName].elementConfig}
              changeHandler={this.formInputHandler}
              valid={this.state.orderForm[fieldName].valid}
              touched={this.state.orderForm[fieldName].touched}
              value={this.state.orderForm[fieldName].value}
            />
          );
        })}
        <div></div>
        <Button btnType="Success">ORDER</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact details below:</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    purchaseBurger: (orderData, token) =>
      dispatch(actionCreators.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axiosInstance));
