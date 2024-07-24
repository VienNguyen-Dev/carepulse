import React from "react";
import { Badge } from "./ui/badge";
import clsx from "clsx";
import Image from "next/image";
import { StatusIcon } from "@/constants";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div className=" flex gap-2">
      <Badge
        className={clsx("status-badge", {
          "bg-green-600": status === "scheduled",
          "bg-red-600": status === "cancelled",
          "bg-blue-600": status === "pending",
        })}
      >
        <Image src={StatusIcon[status]} alt={status} width={24} height={24} className="h-fit w-3" />
        <p
          className={clsx("text-12-semibold capitalize", {
            "text-blue-500": status === "pending",
            "text-green-500": status === "scheduled",
            "text-red-500": status === "cancelled",
          })}
        >
          {status}
        </p>
      </Badge>
    </div>
  );
};

export default StatusBadge;
