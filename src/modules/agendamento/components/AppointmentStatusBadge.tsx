import React from "react";
import { Calendar, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface AppointmentStatusBadgeProps {
  status: string;
}

export const AppointmentStatusBadge: React.FC<AppointmentStatusBadgeProps> = ({ status }) => {
  const normalizedStatus = status.toLowerCase();

  switch (normalizedStatus) {
    case "confirmed":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E9FAF3] text-[#00B37E] border border-[#CDEFE2]">
          <CheckCircle2 size={14} className="text-[#00B37E]" />
          Confirmado
        </span>
      );
    case "cancelled":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FDF2F2] text-[#E5484D] border border-[#FDE8E8]">
          <XCircle size={14} className="text-[#E5484D]" />
          Cancelado
        </span>
      );
    case "reschedule-requested":
    case "rescheduled":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
          <AlertCircle size={14} className="text-[#D97706]" />
          Remarcação Solicitada
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E9FAF3] text-[#00B37E] border border-[#CDEFE2]">
          <Calendar size={14} className="text-[#00B37E]" />
          Agendado
        </span>
      );
  }
};
