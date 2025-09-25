/**
 * API Configuration Constants
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://cove-coding-challenge-api.herokuapp.com';
export const RESERVATIONS_ENDPOINT = '/reservations';
export const RESERVATIONS_URL = `${API_BASE_URL}${RESERVATIONS_ENDPOINT}`;

export const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000; // 10 seconds
export const MAX_RETRY_ATTEMPTS =
  Number(import.meta.env.VITE_MAX_RETRY_ATTEMPTS) || 3;
export const RETRY_DELAY = Number(import.meta.env.VITE_RETRY_DELAY) || 1000; // 1 second
