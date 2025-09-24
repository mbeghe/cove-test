import 'react';

interface Reservation {
  start: Date;
  end: Date;
  room: string;
}

interface ReservationListProps {
  reservations: Reservation[]
}

// TODO: style to match the mock-up
export const ReservationList = ({ reservations }: ReservationListProps) => (
  <div
    style={{ whiteSpace: "pre" }}
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(reservations, null, 2).replace("\n", "<br />"),
    }}
  />
);

