import { AppError } from "@shared/errors/AppError";
import Validator from "validatorjs";

export const Validate = (value: Object, rules: Validator.Rules) => {
  let validation = new Validator(value, rules);
  if (validation.fails()) {
    throw new AppError({ errors: validation.errors.all() });
  }
};
