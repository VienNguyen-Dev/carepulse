import RegisterForm from "@/components/form/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import * as Sentry from "@sentry/nextjs";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  Sentry.metrics.set("user_view_register", user.nane);
  return (
    <div className="h-screen max-h-screen flex">
      {/* Todo: verify OTP || passKey */}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-col flex-1 py-10">
          <Image src={"/assets/icons/logo-full.svg"} width={1000} height={1000} className=" mb-12 h-10 w-fit" alt="patient" />
          <RegisterForm user={user} />
          <div className=" text-14-regular flex justify-between mt-20">
            <p className=" copyright py-12">@ 2024 CarePulse</p>
          </div>
        </div>
      </section>
      <Image src={"/assets/images/register-img.png"} alt="patient" width={1000} height={1000} className="side-img max-w-[390px]" />
    </div>
  );
};

export default Register;
