/**
 * Component Props Types
 */

import type { Room } from './api';

export interface DatePickerProps {
  value: Date;
  onChange: (value: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

export interface DropDownSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: { value: string; name: string }[];
  placeholder?: string;
  disabled?: boolean;
}

export interface ReservationItem {
  id: string;
  start: Date;
  end: Date;
  room: Room;
}

export interface FilterState {
  selectedDate: Date;
  selectedRooms: string[];
}

export interface ReservationFilters {
  date?: Date;
  roomIds?: string[];
}
