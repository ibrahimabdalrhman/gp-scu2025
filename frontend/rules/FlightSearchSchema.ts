import * as yup from "yup";

export const FlightSearchSchema = yup.object({
  from: yup.string().required("Origin is required"),
  to: yup.string().required("Destination is required"),
  class_type: yup.string().required("Please select a ticket type").optional(),

  departure: yup.string().required("Departure date is required").optional(),
  return: yup
    .string()
    .required("Return date is required").optional(),
  travellers: yup
    .number()
    .min(1, "At least one traveller is required").optional(),
  ticketType: yup.string().required("Ticket type is required").optional(),
  

  tripType: yup
    .string()
    .oneOf(["round", "oneway"], "Select a valid trip type")
    .required("Trip type is required").optional(),
});
