import { useQuery } from "@tanstack/react-query";
import { fetchExperienciaHospedeData } from "../api/experiencia-hospede-api";
import type { ExperienciaHospedeData } from "../types";

function useExperienciaHospedeQuery() {
  return useQuery<ExperienciaHospedeData, Error>({
    queryKey: ["experiencia-hospede"],
    queryFn: fetchExperienciaHospedeData,
    staleTime: 5 * 60 * 1000,
  });
}

export { useExperienciaHospedeQuery };
