type ValidationType = {
  required: boolean;
  isEmail: boolean;
  minLength: number;
  maxLength: number;
};

export type ValueType = string | number;

export type FormConfigType = {
  elementType: string;
  elementConfig: {
    type: string;
    name: string;
    placeholder: string;
    options: any;
    validation: any;
    errorMessage: string;
    label?: string;
  };
  value: ValueType;
  valid: boolean;
  touched: boolean;
};

export const formConfig = (
  elementType: string,
  options: any
): FormConfigType => {
  return {
    elementType: elementType ? elementType : "input",
    elementConfig: {
      type: options.type ? options.type : "text",
      name: options.name ? options.name : "",
      placeholder: options.placeholder ? options.placeholder : "",
      options: options.options ? options.options : "",
      validation: options.validation ? options.validation : null,
      errorMessage: options.errorMessage
        ? options.errorMessage
        : `Please enter ${
            options.placeholder ? options.placeholder : ""
          } value`,
    },
    value: options.value ? options.value : "",
    valid: false,
    touched: false,
  };
};

export const checkFieldValidity = (
  value: ValueType,
  validation: ValidationType,
  placeholder: string
) => {
  let valid = true,
    errorMessage = "";

  if (!validation) {
    return { valid, errorMessage };
  }

  if (validation.required && value === "") {
    return { valid: false, errorMessage: `${placeholder} field is required` };
  }

  if (validation.isEmail && !isEmail(value + "")) {
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

export const checkFormValidity = (form: Record<string, FormConfigType>) => {
  let valid = true;

  for (let fieldName in form) {
    if (!form[fieldName].valid) {
      valid = false;
      break;
    }
  }
  return valid;
};

export const isEmail = (email: string) =>
  email.match(/^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/g) !== null;
