import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from './../../../components/UI/Button/Button';
import Spinner from './../../../components/UI/Spinner/Spinner';
import axiosInstance from './../../../axios-orders';
import Input from './../../../components/UI/Input/Input';
import * as actionCreators from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import classes from './ContactData.css';

const formConfig = (elementType, options) => {
  return {
    elementType: elementType ? elementType : 'input',
    elementConfig: {
      type: options.type ? options.type : 'text',
      name: options.name ? options.name : '',
      placeholder: options.placeholder ? options.placeholder : '',
      options: options.options ? options.options : '',
      validation: options.validation ? options.validation : null,
      errorMessage: options.errorMessage
        ? options.errorMessage
        : `Please enter ${
            options.placeholder ? options.placeholder : ''
          } value`,
    },
    value: options.value ? options.value : '',
    valid: false,
    touched: false,
  };
};

const checkFieldValidity = (value, validation) => {
  let valid = true;

  if (!validation) {
    return valid;
  }

  if (validation.required) {
    valid = value !== '' && valid;
  }

  if (!isNaN(validation.minLength)) {
    valid = value >= validation.minLength && valid;
  }

  if (!isNaN(validation.maxLength)) {
    valid = value <= validation.maxLength && valid;
  }

  return valid;
};

const checkFormValidity = form => {
  let valid = true;
  for (let fieldName in form) {
    if (!form[fieldName].valid) {
      valid = false;
      break;
    }
  }
  return valid;
};

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: formConfig('input', {
          type: 'text',
          name: 'name',
          placeholder: 'Name',
          value: '',
          validation: {
            required: true,
          },
        }),
        email: formConfig('input', {
          type: 'text',
          name: 'email',
          placeholder: 'Email',
          validation: {
            required: true,
          },
        }),
        street: formConfig('input', {
          type: 'text',
          name: 'street',
          placeholder: 'Street',
          validation: {
            required: true,
          },
        }),
        postalCode: formConfig('input', {
          type: 'text',
          name: 'postalCode',
          placeholder: 'Post code',
          validation: {
            required: true,
          },
        }),
        country: formConfig('select', {
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
        deliveryMethod: formConfig('select', {
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
      }
    };
  }

  submitHandler = event => {
    event.preventDefault();
    let orderForm = { ...this.state.orderForm };

    for (let fieldName in orderForm) {
      orderForm[fieldName].valid = checkFieldValidity(
        orderForm[fieldName].value,
        orderForm[fieldName].elementConfig.validation
      );
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

    if (!checkFormValidity(orderForm)) {
      console.log('form validation failed');
      return;
    }

    for (let fieldName in orderForm) {
      formData[fieldName] = orderForm[fieldName].value;
    }

    const order = {
      ingredients: this.props.ing,
      price: this.props.totalPrice,
      customer: { ...formData },
    };

    this.props.purchaseBurger(order);
  };

  formInputHandler = event => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    if (
      this.state.orderForm &&
      this.state.orderForm.hasOwnProperty(fieldName)
    ) {
      const fieldValid = checkFieldValidity(fieldValue, {
        ...this.state.orderForm[fieldName].elementConfig.validation,
      });
      this.setState(preState => {
        return {
          orderForm: {
            ...preState.orderForm,
            [fieldName]: {
              ...preState.orderForm[fieldName],
              value: fieldValue,
              valid: fieldValid,
              touched: true,
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
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    purchaseBurger: orderData =>
      dispatch(actionCreators.purchaseBurger(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axiosInstance));
