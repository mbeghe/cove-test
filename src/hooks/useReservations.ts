import { useState, useEffect, useCallback, useMemo } from 'react';
import type { ReservationItem, ApiError } from '../types';
import { fetchReservations } from '../services';

/**
 * Custom hook for managing reservations data
 * Provides loading state, error handling, and data fetching
 */
export const useReservations = () => {
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadReservations = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchReservations(forceRefresh);
      setReservations(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to load reservations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  const memoizedReservations = useMemo(() => reservations, [reservations]);

  return {
    reservations: memoizedReservations,
    loading,
    error,
  };
};
