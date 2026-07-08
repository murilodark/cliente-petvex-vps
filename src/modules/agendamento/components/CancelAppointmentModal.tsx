import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface CancelAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isSubmitting: boolean;
}

export const CancelAppointmentModal: React.FC<CancelAppointmentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting
}) => {
  const [selectedReason, setSelectedReason] = useState("Não poderei comparecer");
  const [additionalReason, setAdditionalReason] = useState("");

  if (!isOpen) return null;

  const quickReasons = [
    "Não poderei comparecer",
    "Tive um imprevisto",
    "Escolhi outro horário",
    "Quero falar com o estabelecimento",
    "Outro motivo"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalReason = selectedReason;
    if (additionalReason.trim()) {
      finalReason += `. Detalhe: ${additionalReason.trim()}`;
    }
    onConfirm(finalReason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-[#E7ECEB] rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2.5 text-[#E5484D]">
            <AlertTriangle size={20} className="shrink-0" />
            <h3 className="font-display font-bold text-[#081426] text-lg sm:text-xl">
              Cancelar Agendamento
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#5F6E7D] hover:text-[#081426] hover:bg-[#F7FAF9] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-[#5F6E7D] text-xs sm:text-sm leading-relaxed mb-4">
          Lamentamos que você não possa comparecer. Por favor, selecione o motivo do cancelamento para avisar o estabelecimento.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quick reasons list */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#5F6E7D] block">
              Selecione o motivo principal
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {quickReasons.map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm cursor-pointer border transition-all ${
                    selectedReason === reason
                      ? "bg-[#FFF5F5] border-[#FDE8E8] text-[#E5484D]"
                      : "bg-white border-[#E5ECEA] text-[#5F6E7D] hover:bg-[#F7FAF9]"
                  }`}
                >
                  <input
                    type="radio"
                    name="cancel_reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="accent-[#E5484D] cursor-pointer"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional text area */}
          <div className="space-y-1.5 text-left">
            <label htmlFor="additional_info" className="text-[11px] font-bold uppercase tracking-wider text-[#5F6E7D] block">
              Descreva o motivo, se desejar (opcional)
            </label>
            <textarea
              id="additional_info"
              rows={3}
              value={additionalReason}
              onChange={(e) => setAdditionalReason(e.target.value)}
              placeholder="Ex: Tive um imprevisto de trabalho e não poderei chegar a tempo."
              className="w-full bg-[#F7FAF9] border border-[#E5ECEA] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#081426] focus:outline-none focus:ring-2 focus:ring-[#E5484D]/10 focus:border-[#E5484D] placeholder:text-[#5F6E7D]/50"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 border border-[#D8E5E0] text-[#081426] bg-white hover:bg-[#F5FBF8] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              Voltar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-[#E5484D] hover:bg-[#C93B40] active:scale-[0.98] disabled:opacity-55 text-white rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isSubmitting ? "Cancelando..." : "Cancelar Agendamento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
