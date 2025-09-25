import React from 'react';
import type { Room as RoomType, ReservationItem } from '../../../types';
import { formatDateTime } from '../../../utils';

interface RoomProps {
  room: RoomType;
  reservations: ReservationItem[];
}

export const Room: React.FC<RoomProps> = ({ room, reservations }) => {
  return (
    <div className="bg-[var(--surface-2)] rounded-xl ring-1 ring-[var(--ring)] overflow-hidden h-fit">
      {/* Room Header */}
      <div className="px-3 py-2 bg-[var(--chip)] border-b border-[var(--ring)]">
        <div className="flex items-center gap-2">
          {room.imageUrl && (
            <img
              src={room.imageUrl}
              alt={room.name}
              className="h-6 w-6 rounded-full object-cover ring-1 ring-[var(--ring)]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <h3 className="text-sm font-semibold text-[var(--title)] truncate">
            {room.name}
          </h3>
          <span className="text-xs text-[var(--muted)] flex-shrink-0">
            ({reservations.length})
          </span>
        </div>
      </div>

      {/* Room Content */}
      <div className="p-3">
        {reservations.length === 0 ? (
          <div className="text-center py-3">
            <p className="text-xs text-[var(--muted)]">No reservations</p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="flex items-center justify-between p-2 bg-[var(--chip)] rounded-md ring-1 ring-[var(--ring)]"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="w-1.5 h-1.5 bg-[var(--brand)] rounded-full flex-shrink-0"></div>
                  <span className="text-xs font-medium text-[var(--title)] truncate">
                    {formatDateTime(reservation.start)} –{' '}
                    {formatDateTime(reservation.end)}
                  </span>
                </div>
                <div className="text-xs text-[var(--muted)] flex-shrink-0 ml-1">
                  {Math.round(
                    (reservation.end.getTime() - reservation.start.getTime()) /
                      (1000 * 60)
                  )}
                  m
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
