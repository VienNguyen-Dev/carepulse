"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";

import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/lib/actions/patient.actions";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants";
import Image from "next/image";
import { SelectItem } from "../ui/select";
import { FileUploader } from "../FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);
    let formData;
    if (values.identificationDocument && values.identificationDocument.length > 0) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      //@ts-ignore
      const patient = await registerPatient(patientData);

      if (patient) router.push(`/patients/${user.$id}/new-appointment`);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1 className="header">Wellcome 👋 </h1>
          <p className=" text-dark-700">Let us know more about yourself</p>
        </section>
        <section className=" space-y-6">
          <div className=" space-y-1">
            <h2 className=" header">Personal Information</h2>
          </div>
        </section>
        <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="name" label="Full name" placeholder="Nguyen Chi Vien" iconSrc="/assets/icons/user.svg" iconAlt="user" />
        <div className="flex gap-6 flex-col xl:flex-row">
          <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="email" label="Email" placeholder="chivien107@gmail.com" iconSrc="/assets/icons/email.svg" iconAlt="email" />
          <CustomFormField control={form.control} fieldType={FormFieldType.PHONE_INPUT} name="phone" label="Phone number" placeholder="(+84) 382195720" iconAlt="phonenumber" />
        </div>
        <div className=" flex gap-6 flex-col xl:flex-row">
          <CustomFormField control={form.control} fieldType={FormFieldType.DATE_PICKER} name="birthDate" label="Date of Birth" />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange} defaultValue={field.value}>
                  {GenderOptions.map((option, i) => (
                    <div key={option + i} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer  capitalize">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className=" flex gap-6 flex-col xl:flex-row">
          <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="address" label="Address" placeholder="42 Nguyễn Khuyến, phường 5, Quận Gò Vấp" />
          <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="occupation" label="Occupation" placeholder="Software Engineer" />
        </div>
        <div className=" flex gap-6 flex-col xl:flex-row">
          <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="emergencyContactName" label="Emergency contact name" placeholder="Guadian's name" />
          <CustomFormField control={form.control} fieldType={FormFieldType.PHONE_INPUT} name="emergencyContactNumber" label="Emergency contact number" placeholder="(+84) 9385736832" />
        </div>

        <section className=" space-y-6">
          <div className=" space-y-1">
            <h2 className=" header">Medical Information</h2>
          </div>
        </section>
        <CustomFormField control={form.control} fieldType={FormFieldType.SELECT} name="primaryPhysician" label="Primary Physician" placeholder="Select a physician">
          {Doctors.map((doctor) => (
            <SelectItem value={doctor.name} key={doctor.name}>
              <div className=" flex cursor-pointer items-center gap-2">
                <Image src={doctor.image} alt={doctor.name} width={32} height={32} className=" rounded-full border border-dark-500" />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        <div className=" flex flex-col gap-6 xl:flex-row">
          <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="insuranceProvider" label="Insuarance Provider" placeholder="BlueCross" />
          <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="insurancePolicyNumber" label="Insuarance policy number" placeholder="aBC1234567" />
        </div>

        <div className=" flex flex-col gap-6 xl:flex-row">
          <CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name="allergies" label="Allergies (if any)" placeholder="Peanuts, Penicillin, Pollen" />
          <CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name="currentMedication" label="Current medications" placeholder="Ibuprofen 200mg, Levothyroxine 50mcg" />
        </div>
        <div className=" flex flex-col gap-6 xl:flex-row">
          <CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name="familyMedicalHistory" label="Family medical history (if relevant)" placeholder="Mother had breast cancer" />
          <CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name="pastMedicalHistory" label="Past medical history" placeholder="Astgna diagnosis in childhood" />
        </div>
        <section className=" space-y-6">
          <div className=" space-y-1">
            <h2 className=" header">Indentification and Verification</h2>
          </div>
        </section>
        <CustomFormField control={form.control} fieldType={FormFieldType.SELECT} name="identificationType" label="Identification type" placeholder="Select a identification">
          {IdentificationTypes.map((type, i) => (
            <SelectItem value={type} key={type + i}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>
        <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="identificationNumber" label="Identification number" placeholder="1234567" />
        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scanned Copy of identification Document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />
        <section className=" space-y-6">
          <div className=" space-y-1">
            <h2 className=" header">Consent and Privacy</h2>
          </div>
        </section>
        <CustomFormField fieldType={FormFieldType.CHECKBOX} name="treatmentConsent" label="I consent to receive treatment for my headlth condition." control={form.control} />
        <CustomFormField fieldType={FormFieldType.CHECKBOX} name="disclosureConsent" label="I consent to the use and disclosure of my headlth information treatment purposes" control={form.control} />
        <CustomFormField fieldType={FormFieldType.CHECKBOX} name="privacyConsent" label="I acknowkedge that I have and agreee to the privacy policy" control={form.control} />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
