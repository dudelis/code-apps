export type KanbanStatus =
  | 'inbox'
  | 'approved'
  | 'scheduled'
  | 'in-progress'
  | 'ready'
  | 'done';

export type MeetingPhase =
  | 'discovery'
  | 'qualification'
  | 'proposal'
  | 'negotiation'
  | 'closing'
  | 'won';

export interface Meeting {
  id: string;
  title: string;
  company: string;
  industry: string;
  date: string;
  startTime: string;
  endTime: string;
  status: KanbanStatus;
  phase: MeetingPhase;
  participantIds: string[];
  actionItemIds: string[];
  emailIds: string[];
  color: string;
  summary: string;
  aiInsights: string[];
}
