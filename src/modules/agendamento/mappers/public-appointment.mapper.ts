import { PublicAppointmentData } from "../types/public-appointment";

export class PublicAppointmentMapper {
  static toDomain(apiResponse: any): PublicAppointmentData {
    const rawData = apiResponse?.data || {};

    const tenant = {
      name: rawData.tenant?.name || "Estabelecimento",
      phone: rawData.tenant?.phone || "",
      logo_url: rawData.tenant?.logo_url || null,
    };

    const client = {
      name: rawData.client?.name || "Cliente",
    };

    const appointment = {
      date: rawData.appointment?.date || "",
      time: rawData.appointment?.time || "",
      status: rawData.appointment?.status || "scheduled",
      can_confirm: typeof rawData.appointment?.can_confirm === "boolean" ? rawData.appointment.can_confirm : true,
      can_cancel: typeof rawData.appointment?.can_cancel === "boolean" ? rawData.appointment.can_cancel : true,
      can_reschedule: typeof rawData.appointment?.can_reschedule === "boolean" ? rawData.appointment.can_reschedule : true,
    };

    const pets = Array.isArray(rawData.pets) && rawData.pets.length > 0 
      ? rawData.pets 
      : ["Não informado"];

    const services = Array.isArray(rawData.services) && rawData.services.length > 0 
      ? rawData.services 
      : ["Não informado"];

    return {
      tenant,
      client,
      appointment,
      pets,
      services,
    };
  }
}
