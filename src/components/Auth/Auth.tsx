"use client";

import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/providers/auth-store-provider";
import classes from "./Auth.module.css";
import * as forms from "../../utils/forms";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import { useBurgerBuilderStore } from "@/providers/burger-builder-store-provider";
import { isAuthenticated } from "@/utils/auth-helper";

type Props = React.PropsWithChildren<{}>;

type FormFieldsKeyType = "email" | "password";

type AuthFormControls = Record<FormFieldsKeyType, forms.FormConfigType>;

export default function Auth({}: Props) {
  const router = useRouter();

  const { buildingBurger } = useBurgerBuilderStore(
    ({ building: buildingBurger }) => ({ buildingBurger })
  );

  const { error, login, loading, token, authRedirectUrl, setAuthRedirectURL } =
    useAuthStore(
      ({
        error,
        login,
        loading,
        token,
        authRedirectUrl,
        setAuthRedirectURL,
      }) => ({
        error,
        login,
        loading,
        token,
        authRedirectUrl,
        setAuthRedirectURL,
      })
    );

  useEffect(() => {
    if (token && isAuthenticated(token) === true) {
      router.push(authRedirectUrl);
      return;
    }
  }, [token, authRedirectUrl]);

  useEffect(() => {
    if (!buildingBurger && authRedirectUrl !== "/") {
      setAuthRedirectURL("/");
    }
  }, []);

  const [isSignUp, setIsSignUp] = useState(false);

  const [controls, setControls] = useState<AuthFormControls>({
    email: forms.formConfig("input", {
      type: "text",
      name: "email",
      placeholder: "Email",
      validation: {
        required: true,
        isEmail: true,
      },
    }),
    password: forms.formConfig("input", {
      type: "password",
      name: "password",
      placeholder: "Password",
      validation: {
        required: true,
        minLength: 8,
        maxLength: 20,
      },
    }),
  });

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    let formControls = { ...controls };

    for (let fieldName in formControls) {
      const { valid, errorMessage } = forms.checkFieldValidity(
        formControls[fieldName as FormFieldsKeyType].value,
        formControls[fieldName as FormFieldsKeyType].elementConfig.validation,
        formControls[fieldName as FormFieldsKeyType].elementConfig.placeholder
      );

      formControls[fieldName as FormFieldsKeyType].valid = valid;

      formControls[fieldName as FormFieldsKeyType].elementConfig = {
        ...formControls[fieldName as FormFieldsKeyType].elementConfig,
        errorMessage,
      };

      formControls[fieldName as FormFieldsKeyType].touched = true;
    }

    setControls(formControls);

    await orderHandler(formControls);
  };

  const orderHandler = async (formControls: AuthFormControls) => {
    if (!forms.checkFormValidity(formControls)) {
      console.log("form validation failed");
      return;
    }

    let formData: Partial<Record<FormFieldsKeyType, forms.ValueType>> = {};

    for (let fieldName in formControls) {
      formData[fieldName as FormFieldsKeyType] =
        formControls[fieldName as FormFieldsKeyType].value;
    }

    const { email, password } = formData as Record<FormFieldsKeyType, string>;

    login({ email, password, isSignUp });
  };

  const formInputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();

    const fieldName = event.target.name as FormFieldsKeyType;
    const fieldValue = event.target.value;

    if (controls && controls.hasOwnProperty(fieldName)) {
      const { valid: fieldValid, errorMessage } = forms.checkFieldValidity(
        fieldValue,
        {
          ...controls[fieldName].elementConfig.validation,
        },
        controls[fieldName].elementConfig.placeholder
      );

      setControls((preState) => ({
        ...preState,
        [fieldName]: {
          ...preState[fieldName],
          value: fieldValue,
          valid: fieldValid,
          touched: true,
          elementConfig: {
            ...preState[fieldName].elementConfig,
            errorMessage,
          },
        },
      }));
    }
  };

  const switchForms = () => setIsSignUp((s) => !s);

  let formTitle = isSignUp ? "Sign Up" : "Sign In";

  let form = (
    <form onSubmit={submitHandler} className="authForm">
      <h4>{formTitle}:</h4>
      {Object.keys(controls).map((fieldName) => (
        <Input
          key={fieldName}
          elementType={controls[fieldName as FormFieldsKeyType].elementType}
          elementConfig={controls[fieldName as FormFieldsKeyType].elementConfig}
          changeHandler={formInputHandler}
          valid={controls[fieldName as FormFieldsKeyType].valid}
          value={controls[fieldName as FormFieldsKeyType].value}
          touched={controls[fieldName as FormFieldsKeyType].touched}
        />
      ))}
      <div className={classes.AuthError}>{error}</div>
      <div>
        <Button btnType="Success">SUBMIT</Button>
      </div>
    </form>
  );

  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.Auth}>
      {form}
      {!loading && (
        <div>
          <Button btnType="Danger" clickHandler={switchForms}>
            SWITCH TO {isSignUp ? "SIGNIN" : "SIGNUP"}
          </Button>
        </div>
      )}
    </div>
  );
}
