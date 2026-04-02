import { useState, useEffect } from 'react';
import { getWeekCalendarEvents } from '../services/calendarService';
import { startOfWeek } from 'date-fns';
import type { Meeting } from '../types';

export function useCalendarEvents(weekStart?: Date): {
  events: Meeting[];
  loading: boolean;
} {
  const effectiveStart = weekStart ?? startOfWeek(new Date(), { weekStartsOn: 1 });
  const [events, setEvents] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getWeekCalendarEvents(effectiveStart)
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [effectiveStart.toISOString()]);

  return { events, loading };
}
