"use client";
import React from "react";
import InputField from "@/components/ui/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "@/rules/contactSchema";
import toast from "react-hot-toast";



const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = (data: any) => {
    toast.success("Your message has been sent successfully");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Send us a message</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <InputField
            id="name"
            label="Full Name"
            {...register("name")}
            type="text"
            placeholder="John Doe"
          />
          {errors.name && <p className="error mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <InputField
            id="email"
            label="Email Address"
            {...register("email")}
            type="email"
            placeholder="john@example.com"
          />
          {errors.email && <p className="error mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <InputField
            id="subject"
            label="Subject"
            {...register("subject")}
            type="text"
            placeholder="How can we help you?"
          />
          {errors.subject && <p className="error mt-1">{errors.subject.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            {...register("message")}
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-white border px-4 py-2"
            placeholder="Your message here..."
          />
          {errors.message && <p className="error mt-1">{errors.message.message}</p>}
        </div>

        <button type="submit" className="w-full btn-v-1">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
