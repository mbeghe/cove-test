import React from 'react';
import type { ReservationItem } from '../../../types';
import { Room } from '../Room';

interface ReservationListProps {
  groupedReservations: Map<string, ReservationItem[]>;
}

export const ReservationList: React.FC<ReservationListProps> = ({
  groupedReservations,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from(groupedReservations.entries()).map(
        ([roomId, reservations]) => {
          const room = reservations[0].room;

          return <Room key={roomId} room={room} reservations={reservations} />;
        }
      )}
    </div>
  );
};
