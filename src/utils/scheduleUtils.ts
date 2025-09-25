import type { Reservation } from '../types';
import dayjs from './dateConfig';

/**
 * Utility function to detect scheduling conflicts between reservations
 *
 * @param reservations - Array of reservations to check for conflicts
 * @returns true if any 2 reservations conflict
 *
 * Rules:
 * - reservations conflict if their times overlap in any way
 * - reservations DO NOT conflict if they are just touching each other (reservation1.end === reservation2.start)
 */
export const isScheduleConflict = (reservations: Reservation[]): boolean => {
  // Early return for empty or single reservation
  if (reservations.length <= 1) {
    return false;
  }

  // Sort reservations by start time for efficient comparison
  const sortedReservations = [...reservations].sort(
    (a, b) => dayjs(a.start).valueOf() - dayjs(b.start).valueOf()
  );

  // Check each reservation against the next one
  for (let i = 0; i < sortedReservations.length - 1; i++) {
    const current = sortedReservations[i];
    const next = sortedReservations[i + 1];

    // Check if current reservation overlaps with next reservation
    // Overlap occurs if current.end > next.start (not equal, as touching is allowed)
    if (dayjs(current.end).isAfter(dayjs(next.start))) {
      return true;
    }
  }

  return false;
};
