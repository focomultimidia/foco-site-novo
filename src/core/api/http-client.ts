import ky, { type KyInstance } from "ky";

const httpClient: KyInstance = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL || "https://api.focotec.com.br/v1",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  retry: {
    limit: 3,
    methods: ["get", "post", "put", "patch"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
});

export { httpClient };
