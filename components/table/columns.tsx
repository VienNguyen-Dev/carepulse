"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { Doctors } from "@/constants";
import AppointmentModal from "../AppointmentModal";
import { Appointment } from "@/app/types/appwrite.types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => {
      return <p className=" text-14-medium">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      return <p className=" regular-14-medium">{row.original.patient.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="min-w[115px]">
          <StatusBadge status={row.original.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      return <p className=" text-14-medium min-w-[100px]">{formatDateTime(row.original.schedule).dateTime}</p>;
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctors",
    cell: ({ row }) => {
      const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician);
      return (
        <div className="flex gap-3 items-center">
          <Image src={doctor.image!} alt={"doctor"} width={100} height={100} className="size-8" />
          <p className=" text-14-medium whitespace-nowrap">Dr. {doctor.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-2">
          <AppointmentModal type="schedule" patientId={data.patient.$id} userId={data.userId} appointment={data} />
          <AppointmentModal type="cancel" patientId={data.patient.$id} userId={data.userId} appointment={data} />
        </div>
      );
    },
  },
];
