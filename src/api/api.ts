import axios from "axios";

// Garantir baseURL correto em produção mesmo sem variável de ambiente
const DEFAULT_BASE_URL = "https://api-production-8968.up.railway.app/";
const BASE_URL = import.meta.env.VITE_NOFAKE_PNG_API_URL || DEFAULT_BASE_URL;

// Log simples para diagnosticar em produção qual baseURL está ativa
if (typeof window !== "undefined") {
  // eslint-disable-next-line no-console
  console.log("[API] baseURL:", BASE_URL);
}

export const api = axios.create({
  baseURL: BASE_URL
});
