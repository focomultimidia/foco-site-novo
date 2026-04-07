import { useExperienciaHospedeQuery } from "./use-experiencia-hospede-query";

function useExperienciaHospedePage() {
  const { data, isLoading, isError, refetch } = useExperienciaHospedeQuery();

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}

export { useExperienciaHospedePage };
