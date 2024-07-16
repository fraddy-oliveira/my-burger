import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as forms from '../../utils/forms';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';

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
            isEmail: true,
          },
        }),
        password: forms.formConfig('input', {
          type: 'password',
          name: 'password',
          placeholder: 'Password',
          validation: {
            required: true,
            minLength: 8,
            maxLength: 20,
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
      const { valid, errorMessage } = forms.checkFieldValidity(
        controls[fieldName].value,
        controls[fieldName].elementConfig.validation,
        controls[fieldName].elementConfig.placeholder
      );

      controls[fieldName].valid = valid;

      controls[fieldName].elementConfig = {
        ...controls[fieldName].elementConfig,
        errorMessage,
      };

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
      const { valid: fieldValid, errorMessage } = forms.checkFieldValidity(
        fieldValue,
        {
          ...this.state.controls[fieldName].elementConfig.validation,
        },
        this.state.controls[fieldName].elementConfig.placeholder
      );

      this.setState(preState => {
        return {
          controls: {
            ...preState.controls,
            [fieldName]: {
              ...preState.controls[fieldName],
              value: fieldValue,
              valid: fieldValid,
              touched: true,
              elementConfig: {
                ...preState.controls[fieldName].elementConfig,
                errorMessage,
              },
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

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectUrl !== '/') {
      this.props.setAuthRedirectURL();
    }
  }

  render() {
    let errorMessage = this.props.error;
    let successLoginRedirect = null;

    if (this.props.isAuthenticated) {
      successLoginRedirect = <Redirect to={this.props.authRedirectUrl} />;
    }

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
        <div className={classes.AuthError}>{errorMessage}</div>
        <div>
          <Button btnType="Success">SUBMIT</Button>
        </div>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    let formTitle = this.state.isSignUp ? 'Sign Up' : 'Sign In';

    return (
      <div className={classes.Auth}>
        {successLoginRedirect}
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

const mapStatetoProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burger.building,
    authRedirectUrl: state.auth.authRedirectUrl,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    setAuthRedirectURL: () => dispatch(actions.setAuthRedirectURL()),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Auth);
