export interface TenantSummary {
  name: string;
  phone: string;
  logo_url: string | null;
}

export interface ClientSummary {
  name: string;
}

export interface PublicAppointment {
  date: string;
  time: string;
  status: string; // e.g., 'scheduled', 'confirmed', 'cancelled', etc.
  can_confirm: boolean;
  can_cancel: boolean;
  can_reschedule: boolean;
}

export interface PublicAppointmentData {
  tenant: TenantSummary;
  client: ClientSummary;
  appointment: PublicAppointment;
  pets: string[];
  services: string[];
}

export interface PublicAppointmentApiResponse {
  message: string;
  status: boolean;
  code: number;
  data: PublicAppointmentData;
}

export interface CancelAppointmentPayload {
  reason?: string;
}

export interface RescheduleAppointmentPayload {
  preferred_date?: string;
  preferred_time?: string;
  message?: string;
}
