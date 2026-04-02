import { useState } from 'react';
import { format, startOfWeek, addDays, parseISO, isSameDay, addWeeks } from 'date-fns';
import { useDataContext } from '../../../context';
import { useCalendarEvents } from '../../../hooks/useCalendarEvents';
import { CalendarMeetingBlock } from './CalendarMeetingBlock';
import { CalendarTaskBlock } from './CalendarTaskBlock';
import { GlassPanel } from '../../common/GlassPanel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Meeting } from '../../../types';

const HOURS = Array.from({ length: 10 }, (_, i) => i + 8); // 08:00–17:00

function timeToPercent(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return ((h - 8 + m / 60) / 10) * 100;
}

export function WeeklyCalendar() {
  const { state } = useDataContext();
  const [weekOffset, setWeekOffset] = useState(0);

  const weekStart = addWeeks(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
    weekOffset,
  );
  const days = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i));

  const { events: connectorEvents, loading } = useCalendarEvents(weekStart);

  // Real Outlook events take precedence; mock fills the rest
  const allMeetings: Meeting[] = [
    ...connectorEvents,
    ...state.meetings.filter(
      (m) => !connectorEvents.some((ce) => ce.id === m.id),
    ),
  ];

  const isCurrentWeek = weekOffset === 0;
  const weekLabel = `${format(weekStart, 'MMM d')} – ${format(addDays(weekStart, 4), 'MMM d, yyyy')}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%', overflow: 'auto' }}>
      {/* Week navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          onClick={() => setWeekOffset((o) => o - 1)}
          style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '3px 6px', color: 'var(--text-primary)', cursor: 'pointer' }}
        >
          <ChevronLeft size={14} />
        </button>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', minWidth: 160, textAlign: 'center' }}>
          {weekLabel}
        </span>
        <button
          onClick={() => setWeekOffset((o) => o + 1)}
          style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '3px 6px', color: 'var(--text-primary)', cursor: 'pointer' }}
        >
          <ChevronRight size={14} />
        </button>
        {!isCurrentWeek && (
          <button
            onClick={() => setWeekOffset(0)}
            style={{ fontSize: 10, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 6, padding: '3px 8px', color: 'var(--accent-primary)', cursor: 'pointer' }}
          >
            Today
          </button>
        )}
        {loading && (
          <span style={{ fontSize: 11, color: 'var(--accent-primary)', marginLeft: 4 }}>
            ⟳ Loading…
          </span>
        )}
      </div>

      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '48px repeat(5, 1fr)', gap: 4 }}>
        <div />
        {days.map((day) => {
          const isToday = isSameDay(day, new Date());
          return (
            <div key={day.toISOString()} style={{ textAlign: 'center', fontSize: 12, color: isToday ? 'var(--accent-primary)' : 'var(--text-secondary)', paddingBottom: 8 }}>
              <div style={{ fontWeight: 600, color: isToday ? 'var(--accent-primary)' : 'var(--text-primary)' }}>{format(day, 'EEE')}</div>
              <div>{format(day, 'MMM d')}</div>
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '48px repeat(5, 1fr)', gap: 4, flex: 1 }}>
        {/* Time labels */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {HOURS.map((h) => (
            <div key={h} style={{ flex: 1, fontSize: 10, color: 'var(--text-muted)', paddingTop: 2 }}>
              {h}:00
            </div>
          ))}
        </div>

        {/* Day columns */}
        {days.map((day) => {
          const dayMeetings = allMeetings.filter((m) => {
            try { return isSameDay(parseISO(m.date), day); } catch { return false; }
          });
          const dayTasks = state.actionItems.filter((a) => {
            try { return isSameDay(parseISO(a.dueDate), day); } catch { return false; }
          });

          return (
            <GlassPanel key={day.toISOString()} style={{ position: 'relative', minHeight: 300, padding: 0 }}>
              {dayMeetings.map((m) => (
                <CalendarMeetingBlock
                  key={m.id}
                  meeting={m}
                  topPercent={timeToPercent(m.startTime)}
                  heightPercent={Math.max(timeToPercent(m.endTime) - timeToPercent(m.startTime), 8)}
                />
              ))}
              {dayTasks.length > 0 && (
                <div style={{ position: 'absolute', bottom: 4, left: 2, right: 2 }}>
                  {dayTasks.map((t) => <CalendarTaskBlock key={t.id} item={t} />)}
                </div>
              )}
            </GlassPanel>
          );
        })}
      </div>
    </div>
  );
}
