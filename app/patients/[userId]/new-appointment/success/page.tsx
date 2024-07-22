import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.action";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);

  return (
    <div className=" min-h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href={"/"}>
          <Image src={"/assets/icons/logo-full.svg"} width={1000} height={1000} alt="logo" className="h-10 w-fit" />
        </Link>
        <section className=" flex flex-col items-center">
          <Image src={"/assets/gifs/success.gif"} width={300} height={280} alt="success" />
        </section>
        <h2 className=" header mb-6 max-w-[600px] text-center">
          Your <span>appointment request</span> has been successfully submitted!
        </h2>
        <p>We'll be in touch shortly confirm.</p>
        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className=" flex items-center gap-3">
            <Image src={doctor?.image!} alt="doctor" width={100} height={100} className="size-6" />
            <p className=" whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className=" flex gap-2">
            <Image src={"/assets/icons/calendar.svg"} alt="calendar" width={24} height={24} />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Button variant={"outline"} asChild className="shad-primary-btn">
          <Link href={`/patients/${userId}/new-appointment`}>New Appointment</Link>
        </Button>
        <p className="copyright">@2024 CarePulse</p>
      </div>
    </div>
  );
};

export default Success;