import type { Highlight, Metric } from '../types';

export const highlights: Highlight[] = [
  {
    id: 'hl-001',
    title: 'Mandalore demo at risk',
    description: 'Beskar IoT demo environment not yet validated for 50k sensor events/sec',
    type: 'risk',
    meetingId: 'mtg-siemens-001',
    priority: 1,
  },
  {
    id: 'hl-002',
    title: 'Coruscant Systems deal advancing',
    description: 'Hyperdrive cost deck accepted by procurement — move to proposal stage',
    type: 'opportunity',
    meetingId: 'mtg-bmw-001',
    priority: 2,
  },
  {
    id: 'hl-003',
    title: 'Cloud City Capital compliance doc overdue',
    description: 'Galactic Trade Federation questionnaire was requested 2 days ago — send today',
    type: 'action',
    meetingId: 'mtg-db-001',
    priority: 3,
  },
];

export const metrics: Metric[] = [
  { id: 'met-001', label: 'Active Deals', value: '5', trend: 'up', trendValue: '+2' },
  { id: 'met-002', label: 'Meetings This Week', value: '5', trend: 'flat', trendValue: '0' },
  { id: 'met-003', label: 'Open Action Items', value: '5', trend: 'down', trendValue: '-1' },
  { id: 'met-004', label: 'Pipeline Value', value: '€4.2M', trend: 'up', trendValue: '+12%' },
];
