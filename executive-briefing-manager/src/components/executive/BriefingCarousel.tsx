import { useDataContext } from '../../context';
import { useCalendarEvents } from '../../hooks/useCalendarEvents';
import { BriefingCard } from './BriefingCard';
import type { Meeting } from '../../types';
import { startOfWeek } from 'date-fns';

export function BriefingCarousel() {
  const { state } = useDataContext();
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const { events: connectorEvents } = useCalendarEvents(weekStart);

  // Merge connector events with mock; connector events shown first
  const allMeetings: Meeting[] = [
    ...connectorEvents,
    ...state.meetings.filter((m) => !connectorEvents.some((ce) => ce.id === m.id)),
  ];

  return (
    <div>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Today's Briefings</div>
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
        {allMeetings.map((m) => (
          <BriefingCard key={m.id} meeting={m} />
        ))}
      </div>
    </div>
  );
}
