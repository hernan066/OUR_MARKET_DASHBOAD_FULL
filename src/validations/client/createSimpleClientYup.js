import { regex } from "validations/regex";
import * as yup from "yup";

const { lettersAndSpaces, onlyNumbers, lettersNumbersAndSpaces } = regex;

export const createSimpleClientSchema = yup.object().shape({
  name: yup
    .string()
    .required("Requerido")
    .matches(lettersAndSpaces, "Solo letras"),
  lastName: yup
    .string()
    .required("Requerido")
    .matches(lettersAndSpaces, "Solo letras"),
  //email: yup.string().email("Formato incorrecto").required("Requerido"),
  phone: yup
    .string()
    .required("Requerido")
    .matches(onlyNumbers, "Solo números"),
  //dni: yup.number().required("Requerido"),
});
export const createSimpleClientAddressSchema = yup.object().shape({
  name: yup
    .string()
    .required("Requerido")
    .matches(lettersAndSpaces, "Solo letras"),
  lastName: yup
    .string()
    .required("Requerido")
    .matches(lettersAndSpaces, "Solo letras"),

  phone: yup
    .string()
    .required("Requerido")
    .matches(onlyNumbers, "Solo números"),

  //address
  address: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  flor: yup.string().matches(lettersNumbersAndSpaces, "Solo letras y números"),
  department: yup
    .string()
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  province: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  city: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  deliveryZone: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  type: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  zip: yup.number().required("Requerido"),
});
