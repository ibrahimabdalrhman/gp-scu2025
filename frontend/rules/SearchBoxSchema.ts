import * as yup from "yup";

export const SearchBoxSchema = yup.object({
  city: yup.string().required("City is required"),
  checkIn: yup
    .string()
    .required("Check-in date is required"),
  checkOut: yup
    .string()
    .required("Check-out date is required"),
  roomType: yup
    .string()
    .oneOf(["single", "double", "suite"], "Select a valid room type")
    .required("Room type is required"),
});
