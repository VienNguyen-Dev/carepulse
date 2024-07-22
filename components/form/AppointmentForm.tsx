"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";

import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { createAppointment } from "@/lib/actions/appointment.action";

const AppointmentForm = ({ userId, type, patientId }: { userId: string; type: "create" | "cancel" | "schedule"; patientId: string }) => {
  const AppointmentFormValidation = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true);
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }
    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          note: values.note,
          reason: values.reason!,
          status: status as Status,
        };
        const appointment = await createAppointment(appointmentData);

        if (appointment) router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1 className="header">New Appointment 👋 </h1>
          <p className=" text-dark-700">Request a new appointment in 10 seconds</p>
        </section>
        {type !== "cancel" && (
          <>
            <CustomFormField control={form.control} fieldType={FormFieldType.SELECT} name="primaryPhysician" label="Doctor" placeholder="Select a physician">
              {Doctors.map((doctor) => (
                <SelectItem value={doctor.name} key={doctor.name}>
                  <div className=" flex cursor-pointer items-center gap-2">
                    <Image src={doctor.image} alt={doctor.name} width={32} height={32} className=" rounded-full border border-dark-500" />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="schedule"
              label="Expected appointment date"
              placeholder="Select your appointment date"
              showTimeSelect
              dateFormat="dd/MM/yyyy - h:mm aa"
            />
            <div className=" flex flex-col gap-6 xl:flex-row">
              <CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name="reason" label="Reason for appoinment" placeholder="Annual montly check-up" />
              <CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name="note" label="Addition a comments/notes" placeholder="Prefer afternoon appoinments if possible" />
            </div>
          </>
        )}
        {type === "cancel" && (
          <CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name="cancellationReason" label="Reason for cancellation" placeholder="Enter reason for cancellation" />
        )}

        <SubmitButton isLoading={isLoading} className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}>
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
