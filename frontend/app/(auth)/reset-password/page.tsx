
"use client";
import InputField from "@/components/ui/InputField";
import { useSendData } from "@/hooks/useSendData";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { set, useForm } from "react-hook-form";
import toast from "react-hot-toast";

// validation schema
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must be 6 digits")
    .required("OTP is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
});

export default function ResetPasswordPage() {
  const { mutateAsync, isPending } = useSendData("user/reset-password-otp");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await mutateAsync(data);
      console.log(res);
      if (res?.status === 201) {
        toast.success(res?.data?.message || "Password has been reset successfully");
        setTimeout(() => {
          window.location.href = "/login";
        },3000)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="container md:py-16 py-6">
      <div className="max-w-[500px] mx-auto px-8 py-12 bg-white rounded-lg shadow-md space-y-6">
        <h1 className="heading-two text-center text-primary">Reset Password</h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputField
              label="Email"
              id="email"
              type="email"
              {...register("email")}
            />
            <p className="error">{errors.email?.message}</p>
          </div>

          <div>
            <InputField
              label="OTP"
              id="otp"
              type="text"
              maxLength={6}
              {...register("otp")}
            />
            <p className="error">{errors.otp?.message}</p>
          </div>

          <div>
            <InputField
              label="New Password"
              id="newPassword"
              type="password"
              {...register("newPassword")}
            />
            <p className="error">{errors.newPassword?.message}</p>
          </div>

          <button type="submit" className="btn-v-1 w-full" disabled={isPending}>
            {isPending ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </section>
  );
}
