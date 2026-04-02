import { Office365OutlookService } from '../generated';
import type { Meeting, KanbanStatus, MeetingPhase } from '../types';
import { format, parseISO, endOfWeek, addDays } from 'date-fns';

const CALENDAR_COLORS = [
  '#6366F1', '#0EA5E9', '#10B981', '#F59E0B', '#EF4444', '#A78BFA', '#EC4899',
];

function colorFromString(s: string): string {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash);
  }
  return CALENDAR_COLORS[Math.abs(hash) % CALENDAR_COLORS.length];
}

function splitDateTime(isoString: string | undefined): { date: string; time: string } {
  if (!isoString) return { date: format(new Date(), 'yyyy-MM-dd'), time: '09:00' };
  try {
    const d = parseISO(isoString.split('.')[0]); // strip fractional seconds
    return { date: format(d, 'yyyy-MM-dd'), time: format(d, 'HH:mm') };
  } catch {
    return { date: format(new Date(), 'yyyy-MM-dd'), time: '09:00' };
  }
}

function domainFromEmail(email: string | undefined): string {
  if (!email) return 'External';
  const match = email.match(/@([^.]+)\./);
  if (!match) return 'External';
  const d = match[1];
  return d.charAt(0).toUpperCase() + d.slice(1);
}

function parseAttendeeEmails(attendees: string | undefined): string[] {
  if (!attendees) return [];
  return attendees
    .split(';')
    .map((a) => a.trim())
    .filter(Boolean);
}

export async function getWeekCalendarEvents(weekStart: Date): Promise<Meeting[]> {
  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
  const startISO = weekStart.toISOString();
  const endISO = addDays(weekEnd, 1).toISOString();

  try {
    const result = await Office365OutlookService.GetEventsCalendarViewV3(
      'Calendar',
      startISO,
      endISO,
    );

    if (!result.success || !result.data?.value?.length) return [];

    return result.data.value.map((event): Meeting => {
      const start = splitDateTime(event.start);
      const end = splitDateTime(event.end);
      const attendeeEmails = parseAttendeeEmails(event.requiredAttendees);

      return {
        id: event.id ?? `cal-${Math.random().toString(36).slice(2)}`,
        title: event.subject ?? 'Untitled Meeting',
        company: domainFromEmail(event.organizer),
        industry: 'External',
        date: start.date,
        startTime: start.time,
        endTime: end.time,
        status: 'scheduled' as KanbanStatus,
        phase: 'discovery' as MeetingPhase,
        participantIds: attendeeEmails,
        actionItemIds: [],
        emailIds: [],
        color: colorFromString(event.id ?? event.subject ?? ''),
        summary: stripHtml(event.body),
        aiInsights: [],
      };
    });
  } catch {
    return [];
  }
}

function stripHtml(html: string | undefined): string {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '').trim().slice(0, 500);
}
