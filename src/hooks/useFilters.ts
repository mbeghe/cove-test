import { useState, useCallback, useMemo } from 'react';
import type { FilterState, ReservationFilters } from '../types';

/**
 * Custom hook for managing filter state.
 * Provides filter state management and derived filter objects
 */
export const useFilters = (initialDate?: Date, initialRooms?: string[]) => {
  const [filterState, setFilterState] = useState<FilterState>({
    selectedDate: initialDate || new Date(),
    selectedRooms: initialRooms || [],
  });

  const updateDate = useCallback((date: Date | null) => {
    if (date) {
      setFilterState((prev) => ({
        ...prev,
        selectedDate: date,
      }));
    }
  }, []);

  const updateRooms = useCallback((roomIds: string[]) => {
    setFilterState((prev) => ({
      ...prev,
      selectedRooms: roomIds,
    }));
  }, []);

  // Memoized filter object for API calls
  const filters = useMemo<ReservationFilters>(
    () => ({
      date: filterState.selectedDate,
      roomIds:
        filterState.selectedRooms.length > 0
          ? filterState.selectedRooms
          : undefined,
    }),
    [filterState.selectedDate, filterState.selectedRooms]
  );

  return {
    filterState,
    filters,
    updateDate,
    updateRooms,
  };
};
