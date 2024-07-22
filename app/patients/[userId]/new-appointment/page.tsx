import AppointmentForm from "@/components/form/AppointmentForm";

import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  return (
    <div className="h-screen max-h-screen flex">
      {/* Todo: verify OTP || passKey */}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px]  flex-1 py-10 justify-between">
          <Image src={"/assets/icons/logo-full.svg"} width={1000} height={1000} className=" mb-12 h-10 w-fit" alt="patient" />
          <AppointmentForm userId={userId} type="create" patientId={patient.$id} />
          <div className=" text-14-regular flex justify-between mt-20">
            <p className=" copyright py-12">@ 2024 CarePulse</p>
          </div>
        </div>
      </section>
      <Image src={"/assets/images/appointment-img.png"} alt="patient" width={1000} height={1000} className="side-img max-w-[390px] bg-bottom" />
    </div>
  );
};

export default Appointment;
