// import * as yup from 'yup';
// export const checkoutSchema = yup.object({
//     firstName: yup.string().required('First name is required'),
//     lastName: yup.string().required('Last name is required'),
//     email: yup.string().email('Invalid email').required('Email is required'),
//     phone: yup.string().matches(/^\d{10,}$/, 'Invalid phone number'),
//     country: yup.string().required('Country is required'),
//     city: yup.string().required('City is required'),
//     paymentMethod: yup.string().oneOf(['visa', 'cash'], 'Select a payment method'),
//   });
import * as yup from 'yup';

export const checkoutSchema = yup.object({

  checkIn: yup
    .date()
    .required('Check-in date is required'),
  checkOut: yup
    .date()
    .required('Check-out date is required')
    .min(yup.ref('checkIn'), 'Check-out must be after check-in'),
});
