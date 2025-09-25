/**
 * API Response Types
 * Based on the Cove API structure
 */

export interface Room {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Reservation {
  id: string;
  start: string; // ISO 8601 date string
  end: string; // ISO 8601 date string
  room: Room;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export type ReservationApiResponse = Reservation[];
