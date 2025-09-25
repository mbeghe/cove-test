import React, { useState } from 'react';
import type { Room as RoomType, ReservationItem } from '../../../types';
import { formatDateTime } from '../../../utils';

interface RoomProps {
  room: RoomType;
  reservations: ReservationItem[];
}

export const Room: React.FC<RoomProps> = ({ room, reservations }) => {
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <>
      <div className="bg-[var(--surface-2)] rounded-xl ring-1 ring-[var(--ring)] overflow-hidden h-fit">
        {/* Room Header */}
        <div className="px-4 py-3 bg-[var(--chip)] border-b border-[var(--ring)]">
          <div className="flex items-center gap-3">
            {room.imageUrl && (
              <img
                src={room.imageUrl}
                alt={room.name}
                className="h-12 w-12 rounded-lg object-cover ring-2 ring-[var(--ring)] shadow-sm transition-transform duration-200 hover:scale-105 cursor-pointer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                onClick={() => setShowImageModal(true)}
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-[var(--title)] truncate">
                {room.name}
              </h3>
              <span className="text-xs text-[var(--muted)]">
                {reservations.length} reservation
                {reservations.length !== 1 ? 's' : ''}
              </span>
            </div>
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
                      (reservation.end.getTime() -
                        reservation.start.getTime()) /
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

      {/* Image Modal */}
      {showImageModal && room.imageUrl && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="relative max-w-2xl max-h-[90vh] bg-[var(--surface)] rounded-xl ring-1 ring-[var(--ring)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[var(--ring)] flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[var(--title)]">
                {room.name}
              </h2>
              <button
                onClick={() => setShowImageModal(false)}
                className="text-[var(--muted)] hover:text-[var(--title)] transition-colors text-2xl leading-none"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <img
                src={room.imageUrl}
                alt={room.name}
                className="w-full h-auto rounded-lg object-cover shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
