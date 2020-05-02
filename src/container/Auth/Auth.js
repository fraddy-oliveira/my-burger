import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as forms from '../../utils/forms';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

import classes from './Auth.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        email: forms.formConfig('input', {
          type: 'text',
          name: 'email',
          placeholder: 'Email',
          validation: {
            required: true,
          },
        }),
        password: forms.formConfig('input', {
          type: 'text',
          name: 'password',
          placeholder: 'Password',
          validation: {
            required: true,
          },
        }),
      },
      isSignUp: true,
    };
  }

  submitHandler = event => {
    event.preventDefault();
    let controls = { ...this.state.controls };

    for (let fieldName in controls) {
      controls[fieldName].valid = forms.checkFieldValidity(
        controls[fieldName].value,
        controls[fieldName].elementConfig.validation
      );
      controls[fieldName].touched = true;
    }

    this.setState(
      prevState => {
        return { controls: controls };
      },
      () => {
        this.orderHandler();
      }
    );
  };

  orderHandler = () => {
    let formData = {},
      controls = { ...this.state.controls };

    if (!forms.checkFormValidity(controls)) {
      console.log('form validation failed');
      return;
    }

    for (let fieldName in controls) {
      formData[fieldName] = controls[fieldName].value;
    }

    const { email, password } = formData;

    this.props.auth(email, password, this.state.isSignUp);
  };

  formInputHandler = event => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    if (this.state.controls && this.state.controls.hasOwnProperty(fieldName)) {
      const fieldValid = forms.checkFieldValidity(fieldValue, {
        ...this.state.controls[fieldName].elementConfig.validation,
      });
      this.setState(preState => {
        return {
          controls: {
            ...preState.controls,
            [fieldName]: {
              ...preState.controls[fieldName],
              value: fieldValue,
              valid: fieldValid,
              touched: true,
            },
          },
        };
      });
    }
  };

  switchForms = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    let form = (
      <form onSubmit={this.submitHandler}>
        {Object.keys(this.state.controls).map(fieldName => {
          return (
            <Input
              key={fieldName}
              elementType={this.state.controls[fieldName].elementType}
              elementConfig={this.state.controls[fieldName].elementConfig}
              changeHandler={this.formInputHandler}
              valid={this.state.controls[fieldName].valid}
              touched={this.state.controls[fieldName].touched}
            />
          );
        })}
        <div>
          <Button btnType="Success">SUBMIT</Button>
        </div>
      </form>
    );

    let formTitle = this.state.isSignUp ? 'Sign Up' : 'Sign In';

    return (
      <div className={classes.Auth}>
        <h4>{formTitle}:</h4>
        {form}
        <div>
          <Button btnType="Danger" clicked={this.switchForms}>
            SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
