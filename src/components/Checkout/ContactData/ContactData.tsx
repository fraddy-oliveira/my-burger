"use client";

import React, { ChangeEventHandler, FormEvent, useState } from "react";

import Button from "@/components/UI/Button/Button";
import Spinner from "@/components/UI/Spinner/Spinner";
import Input from "@/components/UI/Input/Input";
import * as forms from "@/utils/forms";
import { useRouter } from "next/navigation";
import classes from "./ContactData.module.css";
import { useBurgerBuilderStore } from "@/providers/burger-builder-store-provider";
import { useOrdersStore } from "@/providers/orders-store-provider";
import { useAuthStore } from "@/providers/auth-store-provider";

type FormFieldsKeyType =
  | "name"
  | "email"
  | "street"
  | "postalCode"
  | "country"
  | "deliveryMethod";

type ContactFormControls = Record<FormFieldsKeyType, forms.FormConfigType>;

export default function ContactData() {
  const router = useRouter();

  const [orderFormControls, setOrderFormControls] =
    useState<ContactFormControls>({
      name: forms.formConfig("input", {
        type: "text",
        name: "name",
        placeholder: "Name",
        value: "",
        validation: {
          required: true,
        },
      }),
      email: forms.formConfig("input", {
        type: "text",
        name: "email",
        placeholder: "Email",
        validation: {
          required: true,
          isEmail: true,
        },
      }),
      street: forms.formConfig("input", {
        type: "text",
        name: "street",
        placeholder: "Street",
        validation: {
          required: true,
        },
      }),
      postalCode: forms.formConfig("input", {
        type: "text",
        name: "postalCode",
        placeholder: "Post code",
        validation: {
          required: true,
        },
      }),
      country: forms.formConfig("select", {
        name: "country",
        options: [
          {
            value: "india",
            displayValue: "India",
          },
          {
            value: "uk",
            displayValue: "United Kingdom",
          },
        ],
        value: "uk",
        validation: {
          required: true,
        },
      }),
      deliveryMethod: forms.formConfig("select", {
        name: "deliveryMethod",
        options: [
          {
            value: "fastest",
            displayValue: "Fastest",
          },
          {
            value: "slowest",
            displayValue: "Slowest",
          },
        ],
        value: "slowest",
        validation: {
          required: true,
        },
      }),
    });

  const { ingredients, totalPrice } = useBurgerBuilderStore(
    ({ ingredients, totalPrice }) => ({
      ingredients,
      totalPrice,
    })
  );

  const { token } = useAuthStore(({ token }) => ({
    token,
  }));

  const { purchaseBurger, loading } = useOrdersStore(
    ({ purchaseBurger, loading }) => ({
      purchaseBurger,
      loading,
    })
  );

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    let orderForm = { ...orderFormControls };

    for (let fieldName in orderForm) {
      const { valid, errorMessage } = forms.checkFieldValidity(
        orderForm[fieldName as FormFieldsKeyType].value,
        orderForm[fieldName as FormFieldsKeyType].elementConfig.validation,
        orderForm[fieldName as FormFieldsKeyType].elementConfig.placeholder
      );

      orderForm[fieldName as FormFieldsKeyType].valid = valid;

      orderForm[fieldName as FormFieldsKeyType].elementConfig = {
        ...orderForm[fieldName as FormFieldsKeyType].elementConfig,
        errorMessage,
      };

      orderForm[fieldName as FormFieldsKeyType].touched = true;
    }

    setOrderFormControls(orderForm);

    await orderHandler(orderForm);
  };

  const orderHandler = async (orderForm: ContactFormControls) => {
    let formData: Partial<Record<FormFieldsKeyType, forms.ValueType>> = {};

    if (!ingredients) {
      console.error("ingredients is null");
      return;
    }

    if (!token) {
      console.error("Need authentication");
      return;
    }

    if (!forms.checkFormValidity(orderForm)) {
      console.log("form validation failed");
      return;
    }

    for (let fieldName in orderForm) {
      formData[fieldName as FormFieldsKeyType] =
        orderForm[fieldName as FormFieldsKeyType].value;
    }

    const order = {
      ingredients,
      price: Number(Number(totalPrice).toFixed(2)),
      customer: { ...formData },
    };

    await purchaseBurger({
      orderPayload: order,
      token,
    }).then(() => {
      router.push("/");
    });
  };

  const formInputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const fieldName = event.target.name as FormFieldsKeyType;
    const fieldValue = event.target.value;

    if (orderFormControls && orderFormControls.hasOwnProperty(fieldName)) {
      const { valid: fieldValid, errorMessage } = forms.checkFieldValidity(
        fieldValue,
        {
          ...orderFormControls[fieldName].elementConfig.validation,
        },
        orderFormControls[fieldName].elementConfig.placeholder
      );

      setOrderFormControls((preState) => ({
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

  let form = (
    <form onSubmit={submitHandler}>
      {Object.keys(orderFormControls).map((fieldName) => {
        return (
          <Input
            key={fieldName}
            elementType={
              orderFormControls[fieldName as keyof ContactFormControls]
                .elementType
            }
            elementConfig={
              orderFormControls[fieldName as keyof ContactFormControls]
                .elementConfig
            }
            changeHandler={formInputHandler}
            valid={
              orderFormControls[fieldName as keyof ContactFormControls].valid
            }
            touched={
              orderFormControls[fieldName as keyof ContactFormControls].touched
            }
            value={
              orderFormControls[fieldName as keyof ContactFormControls].value
            }
          />
        );
      })}
      <div></div>
      <Button btnType="Success">ORDER</Button>
    </form>
  );

  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact details below:</h4>
      {form}
    </div>
  );
}
