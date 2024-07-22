"use server";

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";

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
