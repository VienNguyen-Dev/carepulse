import PatientForm from "@/components/form/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";
  return (
    <div className="h-screen max-h-screen flex">
      {/* Todo: verify OTP || passKey Modal */}
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w[496px]">
          <Image src={"/assets/icons/logo-full.svg"} width={1000} height={1000} className=" mb-12 h-10 w-fit" alt="patient" />
          <PatientForm />
          <div className=" text-14-regular flex justify-between mt-20">
            <p className=" justify-items-end text-dark-600 xl:text-left">@ 2024 CarePulse</p>
            <Link href={"/?admin=true"} className=" text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image src={"/assets/images/onboarding-img.png"} alt="patient" width={1000} height={1000} className="side-img max-w-[50%]" />
    </div>
  );
}
