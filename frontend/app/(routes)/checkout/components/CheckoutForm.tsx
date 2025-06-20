// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import InputField from "@/components/ui/InputField";
// import { checkoutSchema } from "@/rules/checkoutSchema";

// type FormData = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   country: string;
//   city: string;
//   paymentMethod: "visa" | "cash";
//   cardNumber: string;
//   expDate: string;
//   cvv: string;
// };

// export default function CheckoutForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(checkoutSchema),
//   });

//   const onSubmit = (data: any) => {
//     console.log(data);
//     alert("Booking successful!");
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <InputField placeholder="First Name" {...register("firstName")} />
//       <p className="error">{errors.firstName?.message}</p>

//       <InputField placeholder="Last Name" {...register("lastName")} />
//       <p className="error">{errors.lastName?.message}</p>

//       <InputField placeholder="Email" {...register("email")} />
//       <p className="error">{errors.email?.message}</p>

//       <InputField placeholder="Phone" {...register("phone")} />
//       <p className="error">{errors.phone?.message}</p>

//       <InputField placeholder="Country" {...register("country")} />
//       <p className="error">{errors.country?.message}</p>

//       <InputField placeholder="City" {...register("city")} />
//       <p className="error">{errors.city?.message}</p>

//       <div className="space-y-1">
//         <label className="font-medium block mb-1">Payment Method</label>
//         <div className="flex items-center gap-6">
//           <InputField
//             type="radio"
//             label="Visa"
//             value="visa"
//             {...register("paymentMethod")}
//           />
//           <InputField
//             type="radio"
//             label="Cash"
//             value="cash"
//             {...register("paymentMethod")}
//           />
//         </div>
//         <p className="error">{errors.paymentMethod?.message}</p>
//       </div>

//       <button type="submit" className="btn-v-1">
//         Submit
//       </button>
//     </form>
//   );
// }
"use client";
import InputField from "@/components/ui/InputField";
import { useForm } from "react-hook-form";
import { checkoutSchema } from "@/rules/checkoutSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSendData } from "@/hooks/useSendData";
import toast from "react-hot-toast";
import { useFetchData } from "@/hooks/useFetchData";
import { useRouter } from "next/navigation";

export default function BookingForm({hotelId , hotelName}: {hotelId?: string , hotelName?: string}) {
  const {mutateAsync , isPending , isError} = useSendData("/booking");
const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  const onSubmit = async(data: any) => {
    const sendData = {
      ...data,
      hotel:hotelId
    }
    try {
      const response = await mutateAsync(sendData);
      console.log(response);
      if(response.status === 201){
        router.push(response?.data?.url);
        
      }
    } catch (error : any) {
      toast.error(error.response.data.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputField
          type="date"
          label="Check-In"
          {...register("checkIn")}
        />
        <p className="error">{errors.checkIn?.message}</p>
      </div>

      <div>
        <InputField
          type="date"
          label="Check-Out"
          {...register("checkOut")}
        />
        <p className="error">{errors.checkOut?.message}</p>
      </div>

      <button type="submit" className="btn-v-1">
        Book Now
      </button>
    </form>
  );
}
