import React from "react";
import { PublicAppointmentData } from "../types/public-appointment";
import { AppointmentStatusBadge } from "./AppointmentStatusBadge";
import { Calendar, Clock, User, Scissors, Heart, Phone } from "lucide-react";

interface AppointmentCardProps {
  data: PublicAppointmentData;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ data }) => {
  const { tenant, client, appointment, pets, services } = data;

  return (
    <div className="bg-white border border-[#E7ECEB] rounded-3xl p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] animate-fade-in relative overflow-hidden">
      {/* Decorative Glow accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00B37E]/5 rounded-full filter blur-2xl pointer-events-none"></div>

      {/* Tenant/Establishment Header Banner */}
      <div className="border-b border-[#E5ECEA] pb-6 mb-8 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        {tenant.logo_url ? (
          <img
            src={tenant.logo_url}
            alt={tenant.name}
            className="w-16 h-16 rounded-full object-cover border border-[#E5ECEA] bg-[#F7FAF9] p-1"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-[#E9FAF3] border border-[#CDEFE2] flex items-center justify-center text-[#00B37E] text-2xl font-bold shrink-0 font-display shadow-sm">
            {tenant.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex-1 space-y-1">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#5F6E7D]">
            Você foi convidado por
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[#00B37E] mt-0.5 leading-tight">
            {tenant.name}
          </h2>
          {tenant.phone && (
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[#5F6E7D] text-xs mt-1.5 hover:text-[#081426] transition-colors">
              <Phone size={14} className="text-[#00B37E]" />
              <a href={`tel:${tenant.phone}`} className="hover:underline font-medium">
                {tenant.phone}
              </a>
            </div>
          )}
        </div>

        <div className="shrink-0 mt-3 sm:mt-0">
          <AppointmentStatusBadge status={appointment.status} />
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {/* Left Column: Schedule details */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#5F6E7D] border-b border-[#E5ECEA] pb-2">
            Detalhes do Horário
          </h3>

          {/* Date row */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#E9FAF3] border border-[#CDEFE2] text-[#00B37E] rounded-xl shrink-0 shadow-sm">
              <Calendar size={18} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5F6E7D] tracking-wider">Data do agendamento</span>
              <p className="text-[#081426] font-display font-bold text-base mt-0.5">
                {appointment.date || "Não informada"}
              </p>
            </div>
          </div>

          {/* Time row */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#E9FAF3] border border-[#CDEFE2] text-[#00B37E] rounded-xl shrink-0 shadow-sm">
              <Clock size={18} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5F6E7D] tracking-wider">Horário previsto</span>
              <p className="text-[#081426] font-display font-bold text-base mt-0.5">
                {appointment.time ? `${appointment.time}h` : "Não informado"}
              </p>
            </div>
          </div>

          {/* Client row */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#E9FAF3] border border-[#CDEFE2] text-[#00B37E] rounded-xl shrink-0 shadow-sm">
              <User size={18} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5F6E7D] tracking-wider">Cliente / Tutor</span>
              <p className="text-[#081426] font-display font-bold text-base mt-0.5">
                {client.name || "Cliente"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Pets and Services */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#5F6E7D] border-b border-[#E5ECEA] pb-2">
            Serviços & Pets
          </h3>

          {/* Pets row */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#E9FAF3] border border-[#CDEFE2] text-[#00B37E] rounded-xl shrink-0 shadow-sm">
              <Heart size={18} />
            </div>
            <div className="flex-1">
              <span className="text-[10px] uppercase font-bold text-[#5F6E7D] tracking-wider block mb-1.5">
                Pets atendidos
              </span>
              <div className="flex flex-wrap gap-2">
                {pets.map((pet, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#F7FAF9] border border-[#E5ECEA] text-[#081426] text-xs font-semibold rounded-lg shadow-sm"
                  >
                    🐾 {pet}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Services row */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#E9FAF3] border border-[#CDEFE2] text-[#00B37E] rounded-xl shrink-0 shadow-sm">
              <Scissors size={18} />
            </div>
            <div className="flex-1">
              <span className="text-[10px] uppercase font-bold text-[#5F6E7D] tracking-wider block mb-1.5">
                Serviços contratados
              </span>
              <div className="flex flex-wrap gap-2">
                {services.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#E9FAF3] border border-[#CDEFE2] text-[#00B37E] text-xs font-semibold rounded-lg shadow-sm"
                  >
                    ✨ {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
