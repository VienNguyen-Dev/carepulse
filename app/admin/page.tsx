import { DataTable } from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import { columns } from "@/components/table/columns";

import { getRecentAppointment } from "@/lib/actions/appointment.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Admin = async () => {
  const appoinments = await getRecentAppointment();

  return (
    <div className=" flex flex-col mx-auto max-w-7xl space-y-14">
      <header className="admin-header">
        <Link href={"/"}>
          <Image src={"/assets/icons/logo-full.svg"} alt="logo" width={320} height={160} className=" cursor-pointer" />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>
      <main className=" admin-main">
        <section className=" w-full space-y-4">
          <h1 className="header">Wellcome, Amin 👋</h1>
          <p className=" text-dark-600">Start day with managing new appointment</p>
        </section>
        <section className="admin-stat">
          <StatCard type="appointments" label="Total number of scheduled appointments" count={appoinments.scheduledCount} icon="/assets/icons/appointments.svg" />
          <StatCard type="pending" label="Total number of pending appointments" count={appoinments.pendingCount} icon="/assets/icons/pending.svg" />{" "}
          <StatCard type="cancelled" label="Total number of cancelled appointment" count={appoinments.cancelledCount} icon="/assets/icons/cancelled.svg" />
        </section>

        <DataTable columns={columns} data={appoinments.documents} />
      </main>
    </div>
  );
};

export default Admin;
