import { body } from "express-validator";

export const loginValidation = [
  body("email", `It's not email`).isEmail(),
  body("password", "Min length 8 character").isLength({ min: 8 }),
];

export const registerValidation = [
  body("email", `It's not email`).isEmail(),
  body("password", "Min length 8 character").isLength({ min: 8 }),
  body("fullName", "Full name user").isLength({ min: 2 }),
];
