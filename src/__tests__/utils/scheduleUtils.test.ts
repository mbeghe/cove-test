import { isScheduleConflict } from '../../utils';

describe('scheduleUtils', () => {
  describe('isScheduleConflict', () => {
    it('returns false for an empty list', () => {
      expect(isScheduleConflict([])).toBe(false);
    });

    it('returns false for a single reservation', () => {
      const reservations = [
        {
          id: '1',
          start: '2024-01-01T09:00:00Z',
          end: '2024-01-01T10:00:00Z',
          room: { id: 'room1', name: 'Room A', imageUrl: '' },
        },
      ];
      expect(isScheduleConflict(reservations)).toBe(false);
    });

    it('returns false for non-overlapping reservations', () => {
      const reservations = [
        {
          id: '1',
          start: '2024-01-01T09:00:00Z',
          end: '2024-01-01T10:00:00Z',
          room: { id: 'room1', name: 'Room A', imageUrl: '' },
        },
        {
          id: '2',
          start: '2024-01-01T11:00:00Z',
          end: '2024-01-01T12:00:00Z',
          room: { id: 'room1', name: 'Room A', imageUrl: '' },
        },
      ];
      expect(isScheduleConflict(reservations)).toBe(false);
    });

    it('returns false for touching reservations (end equals start)', () => {
      const reservations = [
        {
          id: '1',
          start: '2024-01-01T09:00:00Z',
          end: '2024-01-01T10:00:00Z',
          room: { id: 'room1', name: 'Room A', imageUrl: '' },
        },
        {
          id: '2',
          start: '2024-01-01T10:00:00Z',
          end: '2024-01-01T11:00:00Z',
          room: { id: 'room1', name: 'Room A', imageUrl: '' },
        },
      ];
      expect(isScheduleConflict(reservations)).toBe(false);
    });

    it('returns true for overlapping reservations', () => {
      const reservations = [
        {
          id: '1',
          start: '2024-01-01T09:00:00Z',
          end: '2024-01-01T10:30:00Z',
          room: { id: 'room1', name: 'Room A', imageUrl: '' },
        },
        {
          id: '2',
          start: '2024-01-01T10:00:00Z',
          end: '2024-01-01T11:00:00Z',
          room: { id: 'room1', name: 'Room A', imageUrl: '' },
        },
      ];
      expect(isScheduleConflict(reservations)).toBe(true);
    });

    it('returns true for completely overlapping reservations', () => {
      const reservations = [
        {
          id: '1',
          start: '2024-01-01T09:00:00Z',
          end: '2024-01-01T11:00:00Z',
          room: { id: 'room1', name: 'Room A', imageUrl: '' },
        },
        {
          id: '2',
          start: '2024-01-01T09:30:00Z',
          end: '2024-01-01T10:30:00Z',
          room: { id: 'room1', name: 'Room A', imageUrl: '' },
        },
      ];
      expect(isScheduleConflict(reservations)).toBe(true);
    });

    it('returns true for one reservation completely inside another', () => {
      const reservations = [
        {
          id: '1',
          start: '2024-01-01T09:00:00Z',
          end: '2024-01-01T12:00:00Z',
          room: { id: 'room1', name: 'Room A', imageUrl: '' },
        },
        {
          id: '2',
          start: '2024-01-01T10:00:00Z',
          end: '2024-01-01T11:00:00Z',
          room: { id: 'room1', name: 'Room A', imageUrl: '' },
        },
      ];
      expect(isScheduleConflict(reservations)).toBe(true);
    });

    it('handles unsorted reservations correctly', () => {
      const reservations = [
        {
          id: '2',
          start: '2024-01-01T10:00:00Z',
          end: '2024-01-01T12:00:00Z',
          room: { id: 'room1', name: 'Room A', imageUrl: '' },
        },
        {
          id: '1',
          start: '2024-01-01T09:00:00Z',
          end: '2024-01-01T11:00:00Z',
          room: { id: 'room1', name: 'Room A', imageUrl: '' },
        },
      ];
      expect(isScheduleConflict(reservations)).toBe(true);
    });

    it('handles multiple reservations with conflicts', () => {
      const reservations = [
        {
          id: '1',
          start: '2024-01-01T09:00:00Z',
          end: '2024-01-01T10:00:00Z',
          room: { id: 'room1', name: 'Room A', imageUrl: '' },
        },
        {
          id: '2',
          start: '2024-01-01T11:00:00Z',
          end: '2024-01-01T12:00:00Z',
          room: { id: 'room1', name: 'Room A', imageUrl: '' },
        },
        {
          id: '3',
          start: '2024-01-01T09:30:00Z',
          end: '2024-01-01T10:30:00Z',
          room: { id: 'room1', name: 'Room A', imageUrl: '' },
        },
      ];
      expect(isScheduleConflict(reservations)).toBe(true);
    });
  });
});
