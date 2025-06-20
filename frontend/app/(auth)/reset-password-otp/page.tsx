"use client";
import InputField from "@/components/ui/InputField";
import { useSendData } from "@/hooks/useSendData";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function page() {
  const { mutateAsync, isPending } = useSendData("user/send-otp");

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
    if (res?.status === 201) {
        toast.success(res?.data?.message || "Reset link sent to your email");
        window.location.href = "verify-otp";
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="container md:py-16 py-6">
      <div className="max-w-[500px] mx-auto px-8 py-12 bg-white rounded-lg shadow-md space-y-6">
        <h1 className="heading-two text-center text-primary">Forgot Password</h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputField
              label="Email"
              id="email"
              {...register("email")}
              type="email"
            />
            <p className="error">{errors.email?.message}</p>
          </div>
          <button type="submit" className="btn-v-1 w-full" disabled={isPending}>
            {isPending ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </section>
  );
}