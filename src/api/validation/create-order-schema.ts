import { z } from "zod";

export const createOrderSchema = z.object({
  ingredients: z.object({
    bacon: z.number(),
    cheese: z.number(),
    meat: z.number(),
    salad: z.number(),
  }),
  customer: z.object({
    name: z.string(),
    email: z.string(),
    deliveryMethod: z.string(),
    street: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  price: z.number(),
});
