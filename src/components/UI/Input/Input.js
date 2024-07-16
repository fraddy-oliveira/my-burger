import React from 'react';
import { nanoid } from 'nanoid';

import classes from './Input.module.css';

const Input = props => {
  let inputElement = null;
  let inputClasses = [classes.InputElement];
  let validationError = null;

  if (!props.valid && props.touched) {
    inputClasses.push(classes.Invalid);
    validationError = (
      <p className={classes.ValidationError}>
        {props.elementConfig.errorMessage}
      </p>
    );
  }

  switch (props.elementType) {
    case 'select':
      let options =
        props.elementConfig &&
        Array.isArray(props.elementConfig.options) &&
        props.elementConfig.options.map(option => (
          <option key={nanoid()} value={option.value}>
            {option.displayValue}
          </option>
        ));

      inputElement = (
        <select
          className={inputClasses.join(' ')}
          name={props.elementConfig.name}
          value={props.value}
          onChange={props.changeHandler}
        >
          {options}
        </select>
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          name={props.elementConfig.name}
          value={props.value}
          onChange={props.changeHandler}
          placeholder={props.elementConfig.placeholder}
        />
      );
      break;
    case 'text':
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          type={props.elementConfig.type}
          name={props.elementConfig.name}
          value={props.value}
          onChange={props.changeHandler}
          placeholder={props.elementConfig.placeholder}
        />
      );
      break;
  }

  let label = props.elementConfig.label ? (
    <label className={classes.Label}>{props.elementConfig.label}</label>
  ) : null;

  return (
    <div className={classes.Input}>
      {label}
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
