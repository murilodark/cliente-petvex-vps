import React from "react";
import { PublicAppointment } from "../types/public-appointment";
import { Check, CalendarRange, Trash2 } from "lucide-react";

interface AppointmentActionsProps {
  appointment: PublicAppointment;
  onConfirmClick: () => void;
  onCancelClick: () => void;
  onRescheduleClick: () => void;
  isSubmitting: boolean;
}

export const AppointmentActions: React.FC<AppointmentActionsProps> = ({
  appointment,
  onConfirmClick,
  onCancelClick,
  onRescheduleClick,
  isSubmitting
}) => {
  const { can_confirm, can_cancel, can_reschedule, status } = appointment;

  const isCompleted = ["confirmed", "cancelled", "reschedule-requested", "rescheduled"].includes(status.toLowerCase());

  if (isCompleted) {
    return (
      <div className="bg-[#F7FAF9] border border-[#E5ECEA] rounded-2xl p-5 text-center shadow-sm">
        <p className="text-[#5F6E7D] text-xs sm:text-sm">
          Este agendamento já foi atualizado para o status <strong className="text-[#00B37E] uppercase font-bold">{status}</strong>. Nenhuma ação pendente disponível.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Primary Confirm Button */}
      {can_confirm && (
        <button
          onClick={onConfirmClick}
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-[#00B37E] hover:bg-[#009C6D] active:scale-[0.99] disabled:opacity-55 transition-all text-white font-display font-bold text-sm sm:text-base rounded-[14px] flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(0,179,126,0.25)] cursor-pointer"
        >
          <Check size={18} className="stroke-[3]" />
          Confirmar Presença
        </button>
      )}

      {/* Secondary Row for Cancel / Reschedule */}
      <div className="flex flex-col sm:flex-row gap-3">
        {can_reschedule && (
          <button
            onClick={onRescheduleClick}
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 border border-[#D8E5E0] bg-white hover:bg-[#F5FBF8] text-[#081426] font-display font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <CalendarRange size={16} className="text-[#00B37E]" />
            Solicitar Remarcação
          </button>
        )}

        {can_cancel && (
          <button
            onClick={onCancelClick}
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 border border-[#D8E5E0] bg-white hover:bg-[#FFF5F5] text-[#E5484D] font-display font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Trash2 size={16} className="text-[#E5484D]" />
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
};
