import { useMotorReservasQuery } from "./use-motor-reservas-query";

function useMotorReservasPage() {
  const { data, isLoading, isError, refetch } = useMotorReservasQuery();

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}

export { useMotorReservasPage };
