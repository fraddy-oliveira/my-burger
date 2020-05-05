export const formConfig = (elementType, options) => {
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

export const checkFieldValidity = (value, validation) => {
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

export const checkFormValidity = form => {
  let valid = true;
  for (let fieldName in form) {
    if (!form[fieldName].valid) {
      valid = false;
      break;
    }
  }
  return valid;
};
