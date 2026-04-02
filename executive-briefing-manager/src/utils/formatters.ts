import { format, parseISO } from 'date-fns';
import type { Priority, MeetingPhase } from '../types';

export function formatDate(iso: string): string {
  return format(parseISO(iso), 'MMM d, yyyy');
}

export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${suffix}`;
}

export function formatTimeRange(start: string, end: string): string {
  return `${formatTime(start)} – ${formatTime(end)}`;
}

export const PRIORITY_COLORS: Record<Priority, string> = {
  high: 'var(--accent-red)',
  medium: 'var(--accent-amber)',
  low: 'var(--accent-green)',
};

export const PHASE_LABELS: Record<MeetingPhase, string> = {
  discovery: 'Discovery',
  qualification: 'Qualification',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  closing: 'Closing',
  won: 'Won',
};

export const PHASE_ORDER: MeetingPhase[] = [
  'discovery',
  'qualification',
  'proposal',
  'negotiation',
  'closing',
  'won',
];
