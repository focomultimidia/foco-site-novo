"use client";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ShieldCheck, X } from "lucide-react";
import { PolicyContent } from "./policy-content";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Reaproveita o mesmo conteúdo da página /politica-de-privacidade
// (PolicyContent) num modal, pra poder ser aberto a partir de qualquer
// formulário do site (ex.: o de orçamento de PMS) sem tirar o usuário do
// fluxo em que está. Sem o sumário (PolicyToc) — ele depende de scroll de
// página pra destacar a seção ativa, o que não se aplica dentro de um modal.
function PolicyModal({ isOpen, onClose }: PolicyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="p-0 gap-0 w-[calc(100%-2rem)] sm:max-w-2xl max-h-[85vh] rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-black/20 overflow-hidden flex flex-col"
      >
        <DialogTitle className="sr-only">Política de Privacidade de Dados</DialogTitle>
        <DialogDescription className="sr-only">
          Texto completo da política de privacidade de dados da Foco Tecnologia.
        </DialogDescription>

        <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#285992]/8 text-[#285992] shrink-0">
              <ShieldCheck className="w-4.5 h-4.5" strokeWidth={1.8} />
            </span>
            <h2 className="font-display text-lg sm:text-xl font-semibold text-[#1e3a5f] tracking-tight truncate">
              Política de Privacidade de Dados
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 sm:px-8 py-2">
          <PolicyContent />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { PolicyModal };
