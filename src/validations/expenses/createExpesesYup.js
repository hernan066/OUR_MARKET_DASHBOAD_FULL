import { regex } from "validations/regex";
import * as yup from "yup";

const { lettersNumbersAndSpaces } = regex;

export const createExpensesSchema = yup.object().shape({
  expensesName: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  category: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),

  amount: yup.number().required("Requerido"),
  date: yup.date().required("Requerido"),
});
