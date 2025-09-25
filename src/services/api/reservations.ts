import type {
  ReservationApiResponse,
  ApiError,
  ReservationItem,
  Reservation,
} from '../../types';
import {
  RESERVATIONS_URL,
  API_TIMEOUT,
  MAX_RETRY_ATTEMPTS,
  RETRY_DELAY,
} from '../../constants';
import dayjs from '../../utils/dateConfig';

interface CacheEntry {
  data: ReservationItem[];
  timestamp: number;
  expiresAt: number;
}

const reservationsCache = new Map<string, CacheEntry>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches all reservations from the API with intelligent caching
 * @param forceRefresh - Force refresh cache (optional)
 * @returns Promise<Reservation[]> - Array of reservations
 * @throws ApiError - If the request fails
 */
export const fetchReservations = async (
  forceRefresh = false
): Promise<ReservationItem[]> => {
  const cacheKey = RESERVATIONS_URL;

  // Check cache first (unless force refresh)
  if (!forceRefresh) {
    const cachedData = getCachedReservations(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  }

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

      const response = await fetch(RESERVATIONS_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: ReservationApiResponse = await response.json();

      const transformedData = data.map(transformReservationFromApi);

      setCachedReservations(RESERVATIONS_URL, transformedData);

      return transformedData;
    } catch (error) {
      lastError = error as Error;

      if (
        error instanceof Error &&
        (error.name === 'AbortError' || error.message.includes('HTTP 4'))
      ) {
        break;
      }

      // Wait before retrying (except on last attempt)
      if (attempt < MAX_RETRY_ATTEMPTS) {
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_DELAY * attempt)
        );
      }
    }
  }

  // All retry attempts failed
  const apiError: ApiError = {
    message: lastError?.message || 'Failed to fetch reservations',
    status: 500,
    code: 'FETCH_RESERVATIONS_FAILED',
  };

  throw apiError;
};

/**
 * Checks if cache entry is still valid
 * @param entry - Cache entry to check
 * @returns true if cache is valid
 */
const isCacheValid = (entry: CacheEntry): boolean => {
  return Date.now() < entry.expiresAt;
};

/**
 * Gets cached reservations if available and valid
 * @param cacheKey - Cache key (usually API URL)
 * @returns Cached data or null if not available/expired
 */
const getCachedReservations = (cacheKey: string): ReservationItem[] | null => {
  const entry = reservationsCache.get(cacheKey);

  if (!entry || !isCacheValid(entry)) {
    if (entry) {
      reservationsCache.delete(cacheKey); // Clean up expired entry
    }
    return null;
  }

  return entry.data;
};

/**
 * Stores reservations in cache
 * @param cacheKey - Cache key
 * @param data - Reservations data to cache
 */
const setCachedReservations = (
  cacheKey: string,
  data: ReservationItem[]
): void => {
  const now = Date.now();
  reservationsCache.set(cacheKey, {
    data,
    timestamp: now,
    expiresAt: now + CACHE_DURATION,
  });
};

/**
 * Transforms a reservation from API format to internal format
 * @param apiReservation - Reservation from API
 * @returns Reservation - Transformed reservation
 */
const transformReservationFromApi = (
  apiReservation: Reservation
): ReservationItem => ({
  id: apiReservation.id,
  start: new Date(apiReservation.start),
  end: new Date(apiReservation.end),
  room: {
    id: apiReservation.room.id,
    name: apiReservation.room.name,
    imageUrl: apiReservation.room.imageUrl,
  },
});

/**
 * Gets unique rooms from reservations
 * @param reservations - Array of reservations
 * @returns Array of unique rooms
 */
export const getUniqueRooms = (reservations: ReservationItem[]) => {
  const roomMap = new Map();

  reservations.forEach((reservation) => {
    if (!roomMap.has(reservation.room.id)) {
      roomMap.set(reservation.room.id, reservation.room);
    }
  });

  return Array.from(roomMap.values());
};

/**
 * Groups reservations by room and sorts them by start time
 * @param reservations - Array of reservations
 * @returns Map of roomId -> sorted reservations array
 */
export const groupReservationsByRoom = (reservations: ReservationItem[]) => {
  const grouped = new Map<string, ReservationItem[]>();

  // Group reservations by room
  reservations.forEach((reservation) => {
    const roomId = reservation.room.id;
    if (!grouped.has(roomId)) {
      grouped.set(roomId, []);
    }
    grouped.get(roomId)!.push(reservation);
  });

  // Sort reservations within each room by start time
  grouped.forEach((roomReservations, roomId) => {
    const sorted = roomReservations.sort((a, b) => {
      return a.start.getTime() - b.start.getTime();
    });
    grouped.set(roomId, sorted);
  });

  return grouped;
};

/**
 * Filters reservations by date and rooms
 * @param reservations - Array of reservations
 * @param filters - Filter criteria
 * @returns Filtered reservations
 */
export const filterReservations = (
  reservations: ReservationItem[],
  filters: { date?: Date; roomIds?: string[] }
): ReservationItem[] => {
  // Early return if no filters applied
  if (!filters.date && (!filters.roomIds || filters.roomIds.length === 0)) {
    return reservations;
  }

  const filterDate = filters.date ? dayjs(filters.date) : null;
  const roomIds = filters.roomIds;
  const roomIdsSet = roomIds ? new Set(roomIds) : null;

  return reservations.filter((reservation) => {
    if (filterDate) {
      if (!dayjs(reservation.start).isSame(filterDate, 'day')) {
        return false;
      }
    }

    if (roomIdsSet && !roomIdsSet.has(reservation.room.id)) {
      return false;
    }

    return true;
  });
};
