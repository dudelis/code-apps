import type { ActionItem } from '../types';

export const actionItems: ActionItem[] = [
  {
    id: 'ai-001',
    title: 'Send Coruscant Systems hyperdrive cost analysis',
    priority: 'high',
    dueDate: new Date(Date.now() + 1 * 86400000).toISOString().slice(0, 10),
    completed: false,
    meetingId: 'mtg-bmw-001',
  },
  {
    id: 'ai-002',
    title: 'Schedule follow-up with Hera Syndulla',
    priority: 'medium',
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
    completed: false,
    meetingId: 'mtg-bmw-001',
  },
  {
    id: 'ai-003',
    title: 'Prepare Outer Rim co-sell proposal for Naboo Solutions',
    priority: 'high',
    dueDate: new Date(Date.now() + 4 * 86400000).toISOString().slice(0, 10),
    completed: false,
    meetingId: 'mtg-sap-001',
  },
  {
    id: 'ai-004',
    title: 'Share sustainability data sheet with Tatooine Mining Corp',
    priority: 'medium',
    dueDate: new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10),
    completed: true,
    meetingId: 'mtg-basf-001',
  },
  {
    id: 'ai-005',
    title: 'Prep live beskar IoT demo environment for Mandalore Industrial',
    priority: 'high',
    dueDate: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
    completed: false,
    meetingId: 'mtg-siemens-001',
  },
  {
    id: 'ai-006',
    title: 'Send Galactic Trade Federation compliance doc to Cloud City Capital',
    priority: 'high',
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
    completed: false,
    meetingId: 'mtg-db-001',
  },
];
