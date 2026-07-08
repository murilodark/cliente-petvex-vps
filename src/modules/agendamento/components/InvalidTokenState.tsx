import React, { useState } from "react";
import { AlertCircle, KeyRound, ArrowRight } from "lucide-react";

interface InvalidTokenStateProps {
  errorMsg?: string;
  onTryToken?: (newToken: string) => void;
}

export const InvalidTokenState: React.FC<InvalidTokenStateProps> = ({ errorMsg, onTryToken }) => {
  const [tokenInput, setTokenInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim() && onTryToken) {
      onTryToken(tokenInput.trim());
    }
  };

  return (
    <div className="bg-white border border-[#E7ECEB] rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-[0_10px_40px_rgba(0,0,0,0.05)] animate-fade-in">
      <div className="w-16 h-16 bg-[#FDF2F2] text-[#E5484D] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#FDE8E8]">
        <AlertCircle size={36} />
      </div>
      <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#081426] mb-4">
        Link Expirado ou Inválido
      </h2>
      <p className="text-[#5F6E7D] text-sm sm:text-base leading-relaxed mb-6">
        {errorMsg || "Este link de agendamento não está mais disponível. Solicite um novo link de confirmação diretamente ao estabelecimento."}
      </p>

      {onTryToken && (
        <div className="border-t border-[#E5ECEA] pt-6 mt-6 text-left">
          <h3 className="text-[#081426] font-display font-bold text-sm mb-2 flex items-center gap-1.5">
            <KeyRound size={16} className="text-[#00B37E]" />
            Inserir Token de Teste Manualmente
          </h3>
          <p className="text-xs text-[#5F6E7D] mb-4 leading-relaxed">
            Se você possui um token de agendamento ativo ou deseja simular um agendamento, digite-o no campo abaixo para carregar os dados.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              required
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Ex: token123, tok_test, etc."
              className="flex-1 bg-[#F7FAF9] border border-[#E5ECEA] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#081426] focus:outline-none focus:ring-2 focus:ring-[#00B37E]/10 focus:border-[#00B37E]"
            />
            <button
              type="submit"
              className="bg-[#00B37E] hover:bg-[#009C6D] active:scale-[0.98] transition-all text-white text-xs font-bold px-4 rounded-xl flex items-center gap-1 shrink-0 cursor-pointer shadow-[0_8px_24px_rgba(0,179,126,0.15)]"
            >
              Acessar
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-[#E5ECEA] text-center">
        <span className="text-[11px] text-[#5F6E7D] font-mono">
          Petvex Tecnologia • Canal de Autoatendimento
        </span>
      </div>
    </div>
  );
};
