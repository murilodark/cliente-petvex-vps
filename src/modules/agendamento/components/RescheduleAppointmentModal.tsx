import React, { useState } from "react";
import { Clock, X } from "lucide-react";

interface RescheduleAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (payload: { preferred_date: string; preferred_time: string; message: string }) => void;
  isSubmitting: boolean;
  defaultDate?: string;
  defaultTime?: string;
}

export const RescheduleAppointmentModal: React.FC<RescheduleAppointmentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
  defaultDate = "",
  defaultTime = ""
}) => {
  // Helper to parse DD/MM/YYYY into YYYY-MM-DD
  const formatDefaultDate = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD
    }
    return dateStr;
  };

  const [preferredDate, setPreferredDate] = useState(formatDefaultDate(defaultDate));
  const [preferredTime, setPreferredTime] = useState(defaultTime);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const quickSuggestions = [
    "Manhã",
    "Tarde",
    "Próximo dia útil",
    "Qualquer horário disponível"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setMessage((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return `Prefiro no período: ${suggestion}.`;
      if (trimmed.toLowerCase().includes(suggestion.toLowerCase())) return prev;
      return `${trimmed}. Prefiro no período: ${suggestion}.`;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      message: message.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-[#E7ECEB] rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2.5 text-[#00B37E]">
            <Clock size={20} className="shrink-0 text-[#00B37E]" />
            <h3 className="font-display font-bold text-[#081426] text-lg sm:text-xl">
              Solicitar Remarcação
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
          Escolha uma data e horário alternativos de sua preferência para que o estabelecimento avalie a possibilidade.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Preferred date and time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="pref_date" className="text-[11px] font-bold uppercase tracking-wider text-[#5F6E7D]">
                Data Preferida *
              </label>
              <input
                id="pref_date"
                type="date"
                required
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="bg-[#F7FAF9] border border-[#E5ECEA] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#081426] focus:outline-none focus:ring-2 focus:ring-[#00B37E]/10 focus:border-[#00B37E]"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="pref_time" className="text-[11px] font-bold uppercase tracking-wider text-[#5F6E7D]">
                Horário Preferido *
              </label>
              <input
                id="pref_time"
                type="time"
                required
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="bg-[#F7FAF9] border border-[#E5ECEA] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#081426] focus:outline-none focus:ring-2 focus:ring-[#00B37E]/10 focus:border-[#00B37E]"
              />
            </div>
          </div>

          {/* Text Area Observation */}
          <div className="space-y-1.5 text-left">
            <label htmlFor="msg" className="text-[11px] font-bold uppercase tracking-wider text-[#5F6E7D] block">
              Observações ou Detalhes (opcional)
            </label>
            <textarea
              id="msg"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ex: Preferência para atendimento no início do dia."
              className="w-full bg-[#F7FAF9] border border-[#E5ECEA] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#081426] focus:outline-none focus:ring-2 focus:ring-[#00B37E]/10 focus:border-[#00B37E] placeholder:text-[#5F6E7D]/50"
            />
          </div>

          {/* Quick Suggestions Pills */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#5F6E7D] block">
              Sugestões Rápidas de Período
            </label>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => handleSuggestionClick(sug)}
                  className="px-3 py-1.5 bg-white hover:bg-[#F5FBF8] hover:text-[#00B37E] transition-all text-[#081426] border border-[#D8E5E0] rounded-lg text-xs font-medium cursor-pointer"
                >
                  {sug}
                </button>
              ))}
            </div>
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
              className="flex-1 px-4 py-2.5 bg-[#00B37E] hover:bg-[#009C6D] active:scale-[0.98] disabled:opacity-55 text-white rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-[0_8px_24px_rgba(0,179,126,0.25)] cursor-pointer"
            >
              {isSubmitting ? "Enviando..." : "Solicitar Remarcação"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
