import React from "react";
import { PublicAppointmentPage } from "./modules/agendamento";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans antialiased text-slate-100 selection:bg-amber-500/10 selection:text-amber-400">
      <PublicAppointmentPage />
    </div>
  );
}
