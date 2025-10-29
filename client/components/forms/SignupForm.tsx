"use client";
import Link from "next/link";
import React from "react";
// React-hook-form and validation with Zod
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../../schemas/SignupSchema";
import { SignupFormFields } from "../../schemas/SignupSchema";
// Toast
import { showToast } from "@/components/jobs/Toast";
// Reach-phone-liberary
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function SignupForm() {
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormFields>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    const toastId = showToast("loading", {
      message: "Please wait a few seconds to signup...",
    });

    try {
      const response = await fetch("https://localhost:7253/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const text = await response.text();
      let parsed;
      try {
        parsed = text ? JSON.parse(text) : null;
      } catch {
        parsed = text;
      }

      if (!response.ok) {
        console.error("❌ Server returned error", response.status, parsed);
        showToast("error", {
          message: `Failed: ${response.status} ${response.statusText}`,
          toastId,
        });
        return;
      }

      if (parsed && parsed.jobId !== undefined) {
        showToast("success", {
          message: parsed.message ?? "Signup has been done successfully!",
          toastId,
        });
        reset();
      } else {
        showToast("success", {
          message: "Signup has been done successfully (unexpected response shape).",
          toastId,
        });
        reset();
      }
      } catch (error) {
        console.error("⚠️ Request error", error);
        showToast("error", {
          message: "Failed to submit the application, please try again later.",
          toastId,
        });
      }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full mx-auto px-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 flex flex-col gap-1.5">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            placeholder="Enter Your First Name.."
            className="border border-gray-500 outline-0 px-4 py-2 rounded-md w-full"
          />
          {errors.firstName && (
            <div className="text-red-600">{errors.firstName.message}</div>
          )}
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-1.5">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            {...register("lastName")}
            placeholder="Enter Your Second Name.."
            className="border border-gray-500 outline-0 px-4 py-2 rounded-md w-full"
          />
          {errors.lastName && (
            <div className="text-red-600">{errors.lastName.message}</div>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col gap-1.5">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Enter Your Email.."
          className="border border-gray-500 outline-0 px-4 py-2 rounded-md"
        />
        {errors.email && (
          <div className="text-red-600">{errors.email.message}</div>
        )}
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 flex flex-col gap-1.5">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter Your Password.."
            className="border border-gray-500 outline-0 px-4 py-2 rounded-md w-full"
          />
          {errors.password && (
            <div className="text-red-600">{errors.password.message}</div>
          )}
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-1.5">
          <label htmlFor="confirmedPassword">Confirm Password</label>
          <input
            id="confirmedPassword"
            type="password"
            {...register("confirmedPassword")}
            placeholder="Confirm Your Password.."
            className="border border-gray-500 outline-0 px-4 py-2 rounded-md w-full"
          />
          {errors.confirmedPassword && (
            <div className="text-red-600">
              {errors.confirmedPassword.message}
            </div>
          )}
        </div>
      </div>
        <div className="w-full flex flex-col gap-1.5">
          <label htmlFor="phone">Phone Number</label>
          <div className="w-full flex gap-2">
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  defaultCountry="EG"
                  international
                  countryCallingCodeEditable={false}
                  placeholder="Enter phone number"
                  className="border p-3 rounded-lg focus:outline-none w-full"
                />
              )}
            />
          </div>
          {errors.phoneNumber && (
            <div className="text-red-500">
              {errors.phoneNumber.message?.toString()}
            </div>
          )}
        </div>

      <button
        type="submit"
        className={`w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md 
            hover:bg-blue-700 hover:shadow-lg cursor-pointer mt-4
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
            transition duration-200${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg cursor-pointer"
            }`}
      >
        {isSubmitting ? "Signing..." : "Signup"}
      </button>
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/Login"
          className="text-blue-600 font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}

export default SignupForm;
