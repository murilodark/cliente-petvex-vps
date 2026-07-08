import React, { useState, useEffect } from "react";
import { publicAppointmentService } from "../services/public-appointment.service";
import { PublicAppointmentMapper } from "../mappers/public-appointment.mapper";
import { PublicAppointmentData } from "../types/public-appointment";
import { AppointmentCard } from "../components/AppointmentCard";
import { AppointmentActions } from "../components/AppointmentActions";
import { CancelAppointmentModal } from "../components/CancelAppointmentModal";
import { RescheduleAppointmentModal } from "../components/RescheduleAppointmentModal";
import { AppointmentSuccessState } from "../components/AppointmentSuccessState";
import { InvalidTokenState } from "../components/InvalidTokenState";
import { ShieldCheck } from "lucide-react";

export const PublicAppointmentPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(() => {
    // Extract token from pathname: /agendamento/:token
    const pathname = window.location.pathname;
    const parts = pathname.split("/");
    const index = parts.indexOf("agendamento");
    if (index !== -1 && parts[index + 1]) {
      return parts[index + 1];
    }
    // Fallback to query params
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("token");
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [appointmentData, setAppointmentData] = useState<PublicAppointmentData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Success flow control
  const [successType, setSuccessType] = useState<"confirm" | "cancel" | "reschedule" | null>(null);

  // Modal open states
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);

  // Handle manual or dynamic token change in UI (interactive fallback)
  const handleTokenSelect = (newToken: string) => {
    window.history.pushState(null, "", `/agendamento/${newToken}`);
    setToken(newToken);
    setSuccessType(null);
    setErrorMsg(null);
  };

  useEffect(() => {
    if (!token) {
      setErrorMsg("Nenhum token de agendamento fornecido. Por favor, acesse o link enviado pelo seu pet shop.");
      return;
    }

    const fetchAppointment = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const response = await publicAppointmentService.getAppointmentByToken(token);
        if (response && response.status) {
          const domainData = PublicAppointmentMapper.toDomain(response);
          setAppointmentData(domainData);
        } else {
          setErrorMsg(response.message || "Link expirado ou inválido. Este link não está mais disponível.");
        }
      } catch (err: any) {
        console.error(err);
        setErrorMsg("Link expirado ou inválido. Este link não está mais disponível. Solicite um novo link ao estabelecimento.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [token]);

  const handleConfirm = async () => {
    if (!token) return;
    const confirmed = window.confirm("Deseja confirmar este agendamento?");
    if (!confirmed) return;

    setIsSubmitting(true);
    try {
      await publicAppointmentService.confirmAppointment(token);
      setSuccessType("confirm");
    } catch (err: any) {
      console.error(err);
      alert("Não foi possível confirmar o agendamento. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async (reason: string) => {
    if (!token) return;
    setIsSubmitting(true);
    try {
      await publicAppointmentService.cancelAppointment(token, { reason });
      setIsCancelOpen(false);
      setSuccessType("cancel");
    } catch (err: any) {
      console.error(err);
      alert("Não foi possível cancelar o agendamento. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReschedule = async (payload: { preferred_date: string; preferred_time: string; message: string }) => {
    if (!token) return;
    setIsSubmitting(true);
    try {
      await publicAppointmentService.requestReschedule(token, payload);
      setIsRescheduleOpen(false);
      setSuccessType("reschedule");
    } catch (err: any) {
      console.error(err);
      alert("Não foi possível enviar a solicitação de remarcação. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500/10 selection:text-amber-400 font-sans relative overflow-x-hidden">
      {/* Background radial blurs */}
      <div className="absolute top-[5%] left-[-10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      {/* Nav Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-display font-black text-lg">
              P
            </div>
            <span className="font-display font-black text-white text-base sm:text-lg tracking-tight">
              Cliente <span className="text-amber-400">PetVex</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium bg-slate-900/60 border border-slate-800/80 px-2.5 py-1.5 rounded-xl">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Ambiente Seguro</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 sm:py-16 flex flex-col justify-center">
        {loading ? (
          <div className="text-center py-12 space-y-4 animate-pulse">
            <div className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm font-medium text-slate-400 font-display">
              Buscando detalhes do agendamento...
            </p>
          </div>
        ) : successType ? (
          <AppointmentSuccessState type={successType} />
        ) : errorMsg ? (
          <InvalidTokenState errorMsg={errorMsg} onTryToken={handleTokenSelect} />
        ) : appointmentData ? (
          <div className="space-y-8 max-w-2xl mx-auto w-full">
            {/* Details Card */}
            <AppointmentCard data={appointmentData} />

            {/* Actions Panel */}
            <AppointmentActions
              appointment={appointmentData.appointment}
              onConfirmClick={handleConfirm}
              onCancelClick={() => setIsCancelOpen(true)}
              onRescheduleClick={() => setIsRescheduleOpen(true)}
              isSubmitting={isSubmitting}
            />

            {/* Modal Overlay Components */}
            <CancelAppointmentModal
              isOpen={isCancelOpen}
              onClose={() => setIsCancelOpen(false)}
              onConfirm={handleCancel}
              isSubmitting={isSubmitting}
            />

            <RescheduleAppointmentModal
              isOpen={isRescheduleOpen}
              onClose={() => setIsRescheduleOpen(false)}
              onConfirm={handleReschedule}
              isSubmitting={isSubmitting}
              defaultDate={appointmentData.appointment.date}
              defaultTime={appointmentData.appointment.time}
            />
          </div>
        ) : (
          <InvalidTokenState
            errorMsg="Por favor, insira ou clique no link recebido para prosseguir."
            onTryToken={handleTokenSelect}
          />
        )}
      </main>

      {/* Simple Brand Footer */}
      <footer className="border-t border-slate-900 py-6 sm:py-8 bg-slate-950 text-slate-500 text-xs text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p className="font-medium text-slate-450 font-display">
            Autoatendimento provido pelo sistema <span className="text-white font-black">PetVex</span>
          </p>
          <p className="text-[11px] text-slate-700">
            © 2026 Petvex Tecnologia • Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
