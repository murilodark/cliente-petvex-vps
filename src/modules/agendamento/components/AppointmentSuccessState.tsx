import React from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface AppointmentSuccessStateProps {
  type: "confirm" | "cancel" | "reschedule";
}

export const AppointmentSuccessState: React.FC<AppointmentSuccessStateProps> = ({ type }) => {
  return (
    <div className="bg-white border border-[#E7ECEB] rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-[0_10px_40px_rgba(0,0,0,0.05)] animate-fade-in">
      {type === "confirm" && (
        <>
          <div className="w-16 h-16 bg-[#E9FAF3] text-[#00B37E] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#CDEFE2]">
            <CheckCircle size={36} className="animate-bounce" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#081426] mb-4">
            Presença Confirmada!
          </h2>
          <p className="text-[#5F6E7D] text-sm sm:text-base leading-relaxed mb-6">
            O seu agendamento foi confirmado com sucesso. Nós e o seu pet estamos ansiosos pela sua visita!
          </p>
        </>
      )}

      {type === "cancel" && (
        <>
          <div className="w-16 h-16 bg-[#FDF2F2] text-[#E5484D] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#FDE8E8]">
            <XCircle size={36} className="animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#081426] mb-4">
            Agendamento Cancelado
          </h2>
          <p className="text-[#5F6E7D] text-sm sm:text-base leading-relaxed mb-6">
            O seu agendamento foi cancelado com sucesso. Caso queira marcar em outro momento, por favor entre em contato direto com o estabelecimento.
          </p>
        </>
      )}

      {type === "reschedule" && (
        <>
          <div className="w-16 h-16 bg-[#FEF3C7] text-[#D97706] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#FDE68A]">
            <Clock size={36} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#081426] mb-4">
            Solicitação Enviada!
          </h2>
          <p className="text-[#5F6E7D] text-sm sm:text-base leading-relaxed mb-6">
            Sua solicitação de remarcação foi enviada com sucesso! O estabelecimento entrará em contato via WhatsApp ou telefone para confirmar seu novo horário.
          </p>
        </>
      )}

      <div className="bg-[#F7FAF9] rounded-2xl p-4 border border-[#E5ECEA] inline-block text-left w-full">
        <div className="flex items-start gap-2.5">
          <span className="text-base shrink-0">🔒</span>
          <p className="text-xs text-[#5F6E7D] leading-relaxed">
            <span className="font-bold text-[#081426] block mb-0.5">Link desativado</span>
            Este link de agendamento já foi processado e não poderá ser utilizado novamente para novas alterações.
          </p>
        </div>
      </div>
    </div>
  );
};
