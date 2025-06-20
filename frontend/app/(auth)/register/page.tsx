"use client";
import InputField from "@/components/ui/InputField";
import { useSendData } from "@/hooks/useSendData";
import { registerSchema } from "@/rules/RegisterSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { set, useForm } from "react-hook-form";

import toast from "react-hot-toast";

const Register = () => {
const router = useRouter();
  const { mutateAsync, isPending } = useSendData("/auth/signup");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data: any) => {
    try {
      const response = await mutateAsync(data);
      toast.success("Registration successful");
      setTimeout(() => {
        router.push("/login");
      })

    } catch (error : any) {
      toast.error(error.response.data.message || "Registration failed");
      console.log(error);
    }
  };

  return (
    <section className="container md:py-16 py-6">
      <div className="max-w-[600px] mx-auto px-8 py-12 bg-white space-y-6 rounded-lg shadow-md">
        <h1 className="heading-two text-center text-primary">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1">
            <InputField
              label="First Name"
              id="firstName"
              {...register("firstname")}
            />
            <p className="error">{errors.firstname?.message}</p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Last Name"
              id="lastName"
              {...register("lastname")}
            />
            <p className="error">{errors.lastname?.message}</p>
          </div>

          <div className="space-y-1">
            <InputField label="Email" id="email" {...register("email")} />
            <p className="error">{errors.email?.message}</p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Password"
              id="password"
              type="password"
              {...register("password")}
            />
            <p className="error">{errors.password?.message}</p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Phone Number"
              id="phone"
              {...register("phone_number")}
            />
            <p className="error">{errors.phone_number?.message}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p>Already have an account? </p>
            <Link href="/login" className="text-primary">
              Login
            </Link>
          </div>

          <button type="submit" className="btn-v-1 w-full" disabled={isPending}>
            {isPending ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};
export default Register;
