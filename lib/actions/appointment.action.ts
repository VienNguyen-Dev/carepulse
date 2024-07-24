"use server";

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases, messaging } from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/app/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (appoinmentData: CreateAppointmentParams) => {
  try {
    const appointment = await databases.createDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, ID.unique(), appoinmentData);

    return parseStringify(appointment);
  } catch (error) {
    console.log("Error while create appointment", error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, appointmentId);
    return parseStringify(appointment);
  } catch (error) {
    console.log("Error while get appointment with appointment ID", error);
  }
};

export const getRecentAppointment = async () => {
  try {
    const appointments = await databases.listDocuments(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, [Query.orderDesc("$createdAt")]);

    const initialCount = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
      if (appointment.status === "scheduled") {
        acc.scheduledCount += 1;
      }
      if (appointment.status === "pending") {
        acc.pendingCount += 1;
      }

      if (appointment.status === "cancelled") {
        acc.cancelledCount += 1;
      }
      return acc;
    }, initialCount);
    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };
    return parseStringify(data);
  } catch (error) {
    console.log("Error while get recent appointments", error);
  }
};

export const updateAppointment = async ({ appointmentId, userId, type, appointment }: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, appointmentId, appointment);

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }

    //TODO SMS notification

    const smsMessage = `
    Hi I'm CarePurlse. 
  ${
    type === "schedule"
      ? `Your appointment has been scheduled for ${formatDateTime(appointment.schedule!).dateTime} with Dr. ${appointment.primaryPhysician}`
      : `We refret to inform you that your appointment has been cancelled. Reason: ${appointment.cancellationReason}`
  }`;

    await sendSMSNotification(userId, smsMessage);
    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log("Error while update appointment", error);
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(ID.unique(), content, [], [userId]);
    return parseStringify(message);
  } catch (error) {
    console.log("Error while send SMS notiification", error);
  }
};
