import React from 'react';

import classes from './Input.css';

const Input = props => {
  let inputElement = null;

  switch (props.inputType) {
    case 'text':
    default:
      inputElement = (
        <input
          className={classes.Input}
          name={props.name}
          value={props.value}
          onChange={props.changeHandler}
          placeholder={props.placeholder}
        />
      );
      break;
  }

  let label = props.label ? <label>{props.label}</label> : null;

  return (
    <div className={classes.Root}>
      {label}
      {inputElement}
    </div>
  );
};

export default Input;
