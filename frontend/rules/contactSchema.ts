import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup.string().required("Full name is required").min(2).max(50),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});