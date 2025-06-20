"use client";
import InputField from "@/components/ui/InputField";
import { useSendData } from "@/hooks/useSendData";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { removeAuthCookie } from "@/libs/auth-cookies";

// validation schema
const schema = yup.object({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .min(6, "New password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your new password"),
});

export default function ChangePasswordPage() {
  const { mutateAsync, isPending } = useSendData("/user/change-password");

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
      const { oldPassword, newPassword } = data;
      const res = await mutateAsync({ oldPassword, newPassword });
      if (res?.status === 201) {
        toast.success(res?.data?.message || "Password changed successfully");
        removeAuthCookie();
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="container md:py-16 py-6">
      <div className="max-w-[500px] mx-auto px-8 py-12 bg-white rounded-lg shadow-md space-y-6">
        <h1 className="heading-two text-center text-primary">
          Change Password
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputField
              label="Old Password"
              id="oldPassword"
              type="password"
              {...register("oldPassword")}
            />
            <p className="error">{errors.oldPassword?.message}</p>
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

          <div>
            <InputField
              label="Confirm New Password"
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
            />
            <p className="error">{errors.confirmPassword?.message}</p>
          </div>

          <button type="submit" className="btn-v-1 w-full" disabled={isPending}>
            {isPending ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </section>
  );
}
