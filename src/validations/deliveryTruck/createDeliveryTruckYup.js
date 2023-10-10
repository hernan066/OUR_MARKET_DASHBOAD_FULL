import { regex } from "validations/regex";
import * as yup from "yup";

const { lettersNumbersAndSpaces, lettersAndSpaces, onlyNumbers } = regex;

export const createDeliveryTruckSchema = yup.object().shape({
  name: yup
    .string()
    .required("Requerido")
    .matches(lettersAndSpaces, "Solo letras y números"),
  lastName: yup
    .string()
    .required("Requerido")
    .matches(lettersAndSpaces, "Solo letras y números"),
  email: yup.string().email("Formato incorrecto").required("Requerido"),
  password: yup.string().min(6, "6 caracteres mínimo").required("Requerido"),
  phone: yup
    .string()
    .required("Requerido")
    .matches(onlyNumbers, "Solo números"),
  dni: yup.string().required("Requerido").matches(onlyNumbers, "Solo números"),
  patent: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  coldChamber: yup.string().required("Requerido"),
  maximumLoad: yup.number().required("Requerido"),
});
