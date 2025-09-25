// App.tsx
import React, { useMemo } from 'react';
import { DatePicker, DropDownSelect, ReservationList } from './components';
import { useReservations, useFilters } from './hooks';
import {
  filterReservations,
  getUniqueRooms,
  groupReservationsByRoom,
} from './services';
import './theme/theme.css';

const App: React.FC = () => {
  const { reservations, loading, error } = useReservations();
  const { filterState, filters, updateDate, updateRooms } = useFilters();

  const roomOptions = useMemo(() => {
    const rooms = getUniqueRooms(reservations);
    return [
      { value: '', name: 'All Rooms' },
      ...rooms.map((r) => ({ value: r.id, name: r.name })),
    ];
  }, [reservations]);

  const filtered = useMemo(
    () => filterReservations(reservations, filters),
    [reservations, filters]
  );

  const groupedReservations = useMemo(() => {
    return groupReservationsByRoom(filtered);
  }, [filtered]);

  return (
    <div className="theme min-h-screen bg-[var(--bg)] flex items-center justify-center">
      <div className="w-full max-w-6xl px-4">
        <div className="rounded-2xl bg-[var(--surface)] shadow-2xl ring-1 ring-[var(--ring)]">
          <div className="px-6 pt-8 pb-4 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--title)]">
              Reservations
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Pick a date and room to check availability.
            </p>
          </div>

          <div className="px-6 py-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className="text-xs font-medium text-[var(--muted)]">
                  Date
                </span>
                <DatePicker
                  value={filterState.selectedDate}
                  onChange={updateDate}
                  placeholder="dd/mm/yyyy"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-xs font-medium text-[var(--muted)]">
                  Room
                </span>
                <DropDownSelect
                  value={filterState.selectedRooms}
                  onChange={updateRooms}
                  options={roomOptions}
                />
              </label>
            </div>
          </div>

          <div className="mx-6 h-px bg-white/10" />

          <div className="px-6 py-6">
            {error && (
              <div className="rounded-xl px-5 py-6 bg-[var(--surface-2)] ring-1 ring-[var(--ring)] text-center">
                <h3 className="mb-1 text-base font-semibold text-[var(--title)]">
                  Error Loading Reservations
                </h3>
                <p className="text-sm text-[var(--muted)]">{error}</p>
              </div>
            )}

            {loading && (
              <div className="rounded-xl px-5 py-6 bg-[var(--surface-2)] ring-1 ring-[var(--ring)] text-center">
                <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-[var(--brand)] border-t-transparent" />
                <h3 className="text-base font-semibold text-[var(--title)]">
                  Loading Reservations…
                </h3>
                <p className="text-sm text-[var(--muted)]">Please wait…</p>
              </div>
            )}

            {!loading && !error && (
              <>
                {groupedReservations.size === 0 ? (
                  <div className="rounded-xl px-5 py-6 bg-[var(--surface-2)] ring-1 ring-[var(--ring)] text-center">
                    <h3 className="mb-1 text-base font-semibold text-[var(--title)]">
                      No reservations found.
                    </h3>
                    <p className="text-sm text-[var(--muted)]">
                      No reservations match your current filters.
                    </p>
                  </div>
                ) : (
                  <ReservationList groupedReservations={groupedReservations} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
