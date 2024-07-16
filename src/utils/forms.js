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

export const checkFieldValidity = (value, validation, placeholder) => {
  let valid = true,
    errorMessage = '';

  if (!validation) {
    return { valid, errorMessage };
  }

  if (validation.required && value === '') {
    return { valid: false, errorMessage: `${placeholder} field is required` };
  }

  if (validation.isEmail && !isEmail(value)) {
    return {
      valid: false,
      errorMessage: `${placeholder} field should be valid email`,
    };
  }

  if (validation.minLength && String(value).length < validation.minLength) {
    return {
      valid: false,
      errorMessage: `${placeholder} length must be atleast ${validation.minLength} characters`,
    };
  }

  if (validation.maxLength && String(value).length > validation.maxLength) {
    return {
      valid: false,
      errorMessage: `${placeholder} length must not exceed ${validation.maxLength} characters`,
    };
  }

  return { valid, errorMessage };
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

export const isEmail = email =>
  String(email).match(/^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/g) !== null;
