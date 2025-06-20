"use client";
import InputField from "@/components/ui/InputField";
import { useSendData } from "@/hooks/useSendData";
import { setAuthCookie } from "@/libs/auth-cookies";
import { LoginSchema } from "@/rules/LoginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const { mutateAsync, isPending } = useSendData("/auth/login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await mutateAsync(data);
      const token = response?.data?.access_token;
      setAuthCookie(token);
      toast.success("Login successful");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error: any) {
      toast.error(error.response.data.message || "Login failed");
      console.log(error);
    }
  };

  return (
    <section className="container md:py-16 py-6">
      <div className="max-w-[600px] mx-auto px-8 py-12 bg-white space-y-6 rounded-lg shadow-md">
        <h1 className="heading-two text-center text-primary">Login</h1>
        <form action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <InputField label="Email" id="email" {...register("email")} />
            <p className="error">{errors.email?.message}</p>
          </div>
          <div>
            <InputField
              label="Password"
              type="password"
              id="password"
              {...register("password")}
            />
            <p className="error">{errors.password?.message}</p>
          </div>
          <div className="text-right mt-2">
  <a href="/reset-password-otp" className="text-sm text-primary hover:underline">
    Forgot your password?
  </a>
</div>

          <button className="btn-v-1 w-full" disabled={isPending}>
            {isPending ? "login..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}
