"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/app/lib/validation";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const PatientForm = () => {
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      // const userData = { name, email, phone };
      // const user = await createUser(userData);
      // if (user) router.push(`/patients/${user?._id}/register`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there </h1>
          <p className=" text-dark-700">Schedule your first apppointment</p>
        </section>

        <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="name" label="Full name" placeholder="Nguyen Chi Vien" iconSrc="/assets/icons/user.svg" iconAlt="user" />
        <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="email" label="Email" placeholder="chivien107@gmail.com" iconSrc="/assets/icons/email.svg" iconAlt="email" />
        <CustomFormField control={form.control} fieldType={FormFieldType.PHONE_INPUT} name="phone" label="Phone number" placeholder="(+84)382195720" iconAlt="phonenumber" />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
