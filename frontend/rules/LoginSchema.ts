import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email"
    )
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required"),
}).required();
