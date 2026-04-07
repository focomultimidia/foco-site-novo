import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  source: string;
}

export function LeadCaptureModal({
  isOpen,
  onClose,
  title,
  description,
}: LeadCaptureModalProps) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    hotel: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Solicitação enviada com sucesso!", {
      description: "Nossa equipe entrará em contato em breve.",
    });

    setIsSubmitting(false);
    setFormData({ nome: "", email: "", telefone: "", hotel: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome completo</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
              placeholder="Seu nome"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              type="tel"
              value={formData.telefone}
              onChange={(e) =>
                setFormData({ ...formData, telefone: e.target.value })
              }
              placeholder="(00) 00000-0000"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hotel">Nome do Hotel</Label>
            <Input
              id="hotel"
              value={formData.hotel}
              onChange={(e) =>
                setFormData({ ...formData, hotel: e.target.value })
              }
              placeholder="Nome do seu hotel"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 rounded-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Solicitar Teste Grátis"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
