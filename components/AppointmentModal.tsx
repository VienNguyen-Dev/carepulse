import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import AppointmentForm from "./form/AppointmentForm";
import { Appointment } from "@/app/types/appwrite.types";

interface AppointmentModalProps {
  type: "schedule" | "cancel";
  userId: string;
  patientId: string;
  appointment: Appointment;
}

const AppointmentModal = ({ type, userId, patientId, appointment }: AppointmentModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className={`capitalize ${type === "schedule" && "text-green-500"}`}>
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className=" mb-4 space-y-3">
          <DialogTitle className=" capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>Please fill in the following details to {type}</DialogDescription>
        </DialogHeader>
        <AppointmentForm type={type} userId={userId} patientId={patientId} appointment={appointment} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
