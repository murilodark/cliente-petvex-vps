import { CancelAppointmentPayload, RescheduleAppointmentPayload, PublicAppointmentApiResponse } from "../types/public-appointment";

const API_URL = (import.meta as any).env?.VITE_API_URL || "https://api.petvex.com.br/api/v1";

export const publicAppointmentService = {
  async getAppointmentByToken(token: string): Promise<PublicAppointmentApiResponse> {
    const response = await fetch(`${API_URL}/public/appointments/${token}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar agendamento: Código ${response.status}`);
    }

    return await response.json();
  },

  async confirmAppointment(token: string): Promise<any> {
    const response = await fetch(`${API_URL}/public/appointments/${token}/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao confirmar agendamento: Código ${response.status}`);
    }

    return await response.json();
  },

  async cancelAppointment(token: string, payload: CancelAppointmentPayload): Promise<any> {
    const response = await fetch(`${API_URL}/public/appointments/${token}/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Erro ao cancelar agendamento: Código ${response.status}`);
    }

    return await response.json();
  },

  async requestReschedule(token: string, payload: RescheduleAppointmentPayload): Promise<any> {
    const response = await fetch(`${API_URL}/public/appointments/${token}/reschedule-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Erro ao solicitar remarcação: Código ${response.status}`);
    }

    return await response.json();
  }
};
