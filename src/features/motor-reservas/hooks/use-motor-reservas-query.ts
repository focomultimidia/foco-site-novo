import { useQuery } from "@tanstack/react-query";
import { fetchMotorReservasData } from "../api/motor-reservas-api";
import type { MotorReservasData } from "../types";

const MOTOR_RESERVAS_QUERY_KEY = ["motor-reservas"] as const;

function useMotorReservasQuery() {
  return useQuery<MotorReservasData, Error>({
    queryKey: MOTOR_RESERVAS_QUERY_KEY,
    queryFn: fetchMotorReservasData,
    staleTime: 5 * 60 * 1000,
  });
}

export { useMotorReservasQuery, MOTOR_RESERVAS_QUERY_KEY };
