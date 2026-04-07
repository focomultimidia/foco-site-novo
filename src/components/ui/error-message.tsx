import { AlertCircle } from "lucide-react";
import { Button } from "./button";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = "Erro",
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <div className="text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-2 text-gray-600">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} className="mt-4" variant="outline">
            Tentar novamente
          </Button>
        )}
      </div>
    </div>
  );
}
