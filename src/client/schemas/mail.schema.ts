import * as yup from "yup";

export const mailSchema = yup.object().shape({
  email: yup.string().email().required(),
  date: yup.date().required(),
  description: yup.string().required(),
});
