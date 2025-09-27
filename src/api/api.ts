import axios from "axios";

// Define a URL base da API
// Se a variável de ambiente estiver definida, usa ela
// Caso contrário, usa a URL relativa que funcionará tanto em desenvolvimento quanto em produção
const apiUrl = import.meta.env.VITE_NOFAKE_PNG_API_URL || 
               (window.location.protocol + '//' + window.location.hostname + 
               (window.location.hostname === 'localhost' ? ':8000' : '/api'));

export const api = axios.create({
    baseURL: apiUrl
})